// src/page/Home/index.tsx
import {startTransition, useCallback, useContext, useEffect, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, ImageBackground, Text} from 'react-native';

import SongList from './SongList';
import LastPlayed from './LastPlayed';
import {globalStyle} from '@/style';
import {SoundContext} from '@/store/context';
import {useFocusEffect} from '@react-navigation/native';

const HomeBG = require('@/../assets/images/HomeBG.jpeg');

// 空初始代码结构，按需添加内容
function Home({navigation}: any) {
    const [hotData, setHotData] = useState<MusicDataProps>([]);
    const [recommendedData, setRecommendedData] = useState<MusicDataProps>([]);
    const {sound} = useContext(SoundContext);
    const [recommendedRefreshing, setRecommendedRefreshing] = useState(false);
    const [hotRefreshing, setHotRefreshing] = useState(false);

    useEffect(() => {
        startTransition(() => {
            getHotMusic();
            getRecommendedMusic();
        });
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (sound) {
                try {
                    console.log('home监听到Sound了');
                    sound.unloadAsync();
                } catch (error) {
                    console.log("homeError啦")
                }
            }
        }, [sound])
    );

    const goToDetails = (item: MusicItemProps) => {
        navigation.navigate('Details', {...item});
    };

    const getHotMusic = async () => {
        setHotRefreshing(true);
        setHotData([]);

        let res: MusicDataProps = [];

        let i = 0;
        while (i < 10) {
            const newItem = await fetchMusicData();
            if (newItem && !res.find(item => item.title === newItem.title)) {
                res.push(newItem);
            }
            if (i === 9) {
                setHotRefreshing(false);
                setHotData(res);
            }
            i++;
        }
    };

    const getRecommendedMusic = async () => {
        setRecommendedRefreshing(true);
        setRecommendedData([]);

        let res: MusicDataProps = [];

        let i = 0;
        while (i < 10) {
            const newItem = await fetchMusicData();
            if (newItem && !res.find(item => item.title === newItem.title)) {
                res.push(newItem);
            }
            if (i === 9) {
                setRecommendedRefreshing(false);
                setRecommendedData(res);
            }
            i++;
        }
    };

    const fetchMusicData = () =>
        fetch('https://api.uomg.com/api/rand.music?sort=热歌榜&format=json')
            .then(res => res.json())
            .then(data => {
                if (data.code === 1) {
                    const {artistsname, name, picurl, url} = data.data;

                    return {src: picurl, title: name, description: artistsname, url};
                }
                return false;
            });

    return (
        <ImageBackground style={styles.root} source={HomeBG} resizeMode="cover">
            <Text style={[styles.title, globalStyle.text]}>热歌</Text>
            <SongList
                data={hotData}
                goToDetails={goToDetails}
                refreshing={hotRefreshing}
                fetchData={getHotMusic}
            />
            <Text style={[styles.title, globalStyle.text]}>推荐歌曲</Text>
            <LastPlayed
                data={recommendedData}
                refreshing={recommendedRefreshing}
                fetchData={getRecommendedMusic}
            />
            <StatusBar style="light" />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 10,
    },
    title: {
        height: 'auto',
        fontSize: 32,
        fontWeight: '900',
    },
});

export default Home;
