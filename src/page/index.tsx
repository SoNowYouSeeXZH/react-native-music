import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigation} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CommonActions} from '@react-navigation/native';

import Home from './Home';
import Details from './Details';
import {SoundContext} from '@/store/context';
import {Audio} from 'expo-av';

const Tab = createBottomTabNavigator();

export default function RootPage() {
    const [sound, setSound] = React.useState<Audio.Sound>();

    return (
        <SoundContext.Provider
            value={{
                sound,
                setSound,
            }}
        >
            <Tab.Navigator
                tabBar={({navigation, state, descriptors, insets}) => {
                    const {index, routes} = state;
                    const style = descriptors[state.history[state.index].key].options.tabBarStyle;
                    return (
                        <BottomNavigation.Bar
                            style={style}
                            theme={{colors: {secondaryContainer: '#9254de'}}}
                            navigationState={{
                                index,
                                routes: routes.filter(route => route.name !== 'Details'),
                            }}
                            safeAreaInsets={insets}
                            inactiveColor="#9c9c9c"
                            activeColor="#f9f0ff"
                            onTabPress={({route, preventDefault}) => {
                                const event = navigation.emit({
                                    type: 'tabPress',
                                    target: route.key,
                                    canPreventDefault: true,
                                });

                                if (event.defaultPrevented) {
                                    preventDefault();
                                } else {
                                    navigation.dispatch({
                                        ...CommonActions.navigate(route.name, route.params),
                                        target: state.key,
                                    });
                                }
                            }}
                            renderIcon={({route, focused, color}) => {
                                const {options} = descriptors[route.key];
                                if (options.tabBarIcon) {
                                    return options.tabBarIcon({focused, color, size: 24});
                                }
                                return null;
                            }}
                            getLabelText={({route}) => {
                                const {options} = descriptors[route.key];
                                const label = options.tabBarLabel || options.title || route.name;
                                return label as string;
                            }}
                        />
                    );
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarLabel: '首页',
                        tabBarIcon: ({color, size}) => {
                            return <Icon name="home" size={size} color={color} />;
                        },
                        tabBarStyle: styles.homeBar,
                        title: '帕帕熊音乐小屋',
                        headerStyle: {
                            backgroundColor: '#262626',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
                <Tab.Screen
                    name="Details"
                    component={Details}
                    options={{
                        title: '帕帕熊演奏中🎵',
                        tabBarStyle: styles.detailsBar,
                        headerStyle: {
                            backgroundColor: '#2b5876',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
            </Tab.Navigator>
        </SoundContext.Provider>
    );
}

const styles = StyleSheet.create({
    homeBar: {
        backgroundColor: '#262626',
    },
    detailsBar: {
        display: 'none',
    },
});
