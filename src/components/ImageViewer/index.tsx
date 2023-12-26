import React, {memo} from 'react';
import {ImageStyle, StyleProp} from 'react-native';
import {
    ImageBackground,
    ImageSourcePropType,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';

import {globalStyle} from '@/style';

interface ImageViewerProps {
    item: {src: ImageSourcePropType; title: string; description: string};
    style?: StyleProp<ViewStyle>;
    imgStyle?: StyleProp<ImageStyle>;
    showText?: boolean;
    [key: string]: any;
}

function ImageViewer({item, style, imgStyle, showText = true}: ImageViewerProps) {
    return (
        <ImageBackground
            style={[styles.imageBackground, style]}
            imageStyle={[styles.img, imgStyle]}
            source={{uri: item.src} as any}
            resizeMode="cover"
        >
            {showText && (
                <View>
                    <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={[styles.title, globalStyle.text]}
                    >
                        {item.title}
                    </Text>
                    <Text
                        ellipsizeMode="tail"
                        numberOfLines={2}
                        style={[styles.description, globalStyle.text]}
                    >
                        {item.description}
                    </Text>
                </View>
            )}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        justifyContent: 'flex-end',

        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    img: {
        borderRadius: 24,
    },
    title: {
        fontSize: 18,
        fontWeight: '800',
    },
    description: {
        fontSize: 12,
        fontWeight: '500',
    },
});

export default memo(ImageViewer);
