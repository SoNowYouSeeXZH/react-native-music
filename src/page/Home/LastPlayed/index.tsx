import {StyleSheet, FlatList, SafeAreaView, View, RefreshControl} from 'react-native';
import {Text, Icon} from 'react-native-paper';
import React from 'react';
import ImageViewer from '@/components/ImageViewer';
import {globalStyle} from '@/style';

interface PROPS {
    data?: MusicDataProps;
    refreshing?: boolean;
    fetchData?: () => void;
}
const renderItem = ({item, index}: {item: MusicItemProps; index: number}) => {
    return (
        <View style={styles.listItemBox}>
            <Text style={[globalStyle.text]}>{index + 1 < 10 ? '0' + (index + 1) : index + 1}</Text>
            <View style={styles.listItemBox_centerBox}>
                <View style={styles.listItemBox_centerBox_imgCard}>
                    <ImageViewer item={item} showText={false} imgStyle={{borderRadius: 4}} />
                </View>
                <View style={styles.listItemBox_centerBox_textBox}>
                    <Text style={[styles.listItemBox_centerBox_textBox_title, globalStyle.text]}>
                        {item.title}
                    </Text>
                    <Text style={[styles.listItemBox_centerBox_textBox_description]}>
                        {item.description}
                    </Text>
                </View>
            </View>
            <Icon size={36} source="dots-horizontal" color="#fff" />
        </View>
    );
};

const LastPlayed = ({data, refreshing = false, fetchData}: PROPS) => {
    return (
        <SafeAreaView style={styles.root}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.title}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}
            />
        </SafeAreaView>
    );
};

export default LastPlayed;

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    listItemBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listItemBox_centerBox: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    listItemBox_centerBox_imgCard: {width: 50, height: 50},
    listItemBox_centerBox_textBox: {
        marginLeft: 10,
    },
    listItemBox_centerBox_textBox_title: {
        fontSize: 18,
        marginBottom: 5,
    },
    listItemBox_centerBox_textBox_description: {
        color: '#bfbfbf',
    },
    listItemBox_moreIcon: {
        alignItems: 'center',
        fontSize: 36,
    },
});
