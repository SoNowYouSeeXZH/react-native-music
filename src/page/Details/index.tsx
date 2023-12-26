import React, {useEffect, useCallback, useState, useRef, useContext} from 'react';
import {View, StyleSheet, Image, Pressable, BackHandler} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Icon} from 'react-native-paper';
import {LinearGradient} from 'expo-linear-gradient';
import {Audio} from 'expo-av';
import ImageViewer from '@/components/ImageViewer';
import {useFocusEffect} from '@react-navigation/native';
import {SoundContext} from '@/store/context';

function Details({route}: any) {
    const imageAnimatableViewRef = useRef<any>(null);
    const {sound, setSound} = useContext(SoundContext);
    const [totalDuration, setTotalDuration] = useState<number>();
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        imageAnimatableViewRef.current?.bounceInDown();

        const id = route.params.url.split('?id=')[1];
        getSound(id);
    }, [route.params]);

    async function getSound(id: string) {
        try {
            const res = await Audio.Sound.createAsync({
                uri: `https://link.hhtjim.com/163/${id}.mp3`,
            });

            setSound(res.sound);
        } catch (error) {
            console.log('getSoundError啦');
        }
    }

    useEffect(() => {
        try {
            if (sound) {
                playSound();
            }
        } catch (error) {
            console.log('playSoundError啦啦啦啦啦');
        }
    }, [sound]);

    useFocusEffect(
        useCallback(() => {
            if (sound) {
                return () => {
                    console.log('leave');
                    setIsPlaying(false);
                    try {
                        sound.unloadAsync();
                    } catch (error) {
                        console.log('unloadAsyncError啦');
                    }
                };
            }
        }, [sound])
    );

    const playSound = async () => {
        console.log('playAsync');
        await sound!.playAsync();

        const res = await sound!.getStatusAsync();
        if (res.isLoaded) {
            console.log(res.durationMillis, 'durationMillis');
            setTotalDuration(res.durationMillis);
            setIsPlaying(res.isPlaying);
        }
    };

    const togglePlayMusic = async () => {
        if (sound) {
            if (isPlaying) {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();
            }
        }
        setIsPlaying(state => !state);
    };

    return (
        <LinearGradient
            colors={['#2b5876', '#4e4376']}
            style={styles.container}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
        >
            <View style={{flex: 1}}>
                <Animatable.View
                    ref={imageAnimatableViewRef}
                    animation="bounceInDown"
                    style={styles.imgBox}
                >
                    <Image
                        style={styles.blurImg}
                        blurRadius={20}
                        source={{uri: route.params.src}}
                    />
                    <ImageViewer item={route.params} />
                </Animatable.View>
                <View style={styles.audioBox}>
                    <Pressable onPress={togglePlayMusic}>
                        {isPlaying ? (
                            <Animatable.View
                                animation="rotate"
                                easing="linear"
                                iterationCount="infinite"
                                direction="reverse"
                            >
                                <Icon size={78} source="motion-pause" color="#fff" />
                            </Animatable.View>
                        ) : (
                            <Icon size={78} source="motion-play" color="#fff" />
                        )}
                    </Pressable>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    imgBox: {
        flex: 3,
        paddingLeft: 50,
        position: 'relative',
    },
    blurImg: {
        width: '100%',
        height: '100%',
        borderRadius: 24,
        position: 'absolute',
        top: 40,
        left: 0,
    },
    audioBox: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Details;
function useBackHandler(arg0: () => boolean) {
    throw new Error('Function not implemented.');
}
