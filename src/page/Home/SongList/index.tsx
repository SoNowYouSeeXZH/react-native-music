import {useCallback, useRef} from 'react';
import {
    Dimensions,
    StyleSheet,
    Animated,
    View,
    FlatList,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';

import ImageViewer from '@/components/ImageViewer';

const imageViewer_width = 188;
const imageViewerShadow_width = 4;

interface PROPS {
    data?: MusicDataProps;
    refreshing?: boolean;
    fetchData?: () => void;
    goToDetails: (item: MusicItemProps) => void;
}

export default function SongList({data, refreshing = false, fetchData, goToDetails}: PROPS) {
    const scrollX = useRef(new Animated.Value(0)).current;

    const cardStyles = useCallback((index: number) => {
        const inputRange = [
            (index - 1) * imageViewer_width,
            index * imageViewer_width,
            (index + 1) * imageViewer_width,
        ];

        if (data && data.length > 3 && index === data.length - 1) {
            const window_width = Dimensions.get('window').width;
            const endScrollToRight_width = Math.floor(
                imageViewer_width * data.length - window_width + 5
            );
            inputRange[0] = window_width - imageViewer_width / 2;
            inputRange[1] = endScrollToRight_width;
        }

        const tilt = scrollX.interpolate({
            inputRange,
            outputRange: ['-25deg', '0deg', '25deg'],
            extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
        });

        return {
            transform: [{perspective: 1000}, {rotateY: tilt}],
            opacity,
        };
    },[refreshing]);

    const renderItem = useCallback(
        ({item, index}: {item: MusicItemProps; index: number}) => (
            <TouchableOpacity
                key={index}
                onPress={() => {
                    goToDetails(item);
                }}
            >
                <Animated.View
                    key={index}
                    style={[
                        data && index === data.length - 1 ? styles.lastCard : null,
                        styles.card,
                        cardStyles(index),
                    ]}
                >
                    <View style={styles.shadowBox}>
                        <ImageViewer item={item} index={index} />
                    </View>
                </Animated.View>
            </TouchableOpacity>
        ),
        []
    );

    return (
        <Animated.View style={styles.root}>
            <FlatList
                horizontal={true}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.title}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}
                getItemLayout={(_, index) => ({
                    length: imageViewer_width,
                    offset: imageViewer_width * index,
                    index,
                })}
                onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
                    useNativeDriver: false,
                })}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    root: {
        height: imageViewer_width,
        marginVertical: 15,
        alignItems: 'center',
    },
    card: {
        width: imageViewer_width + imageViewerShadow_width,
        height: imageViewer_width,
    },
    shadowBox: {
        flex: 1,
        elevation: 3,
        paddingRight: imageViewerShadow_width,
        backgroundColor: 'rgba(20,20,20,.5)',
        borderRadius: 24,
    },
    lastCard: {
        marginLeft: 5,
    },
});
