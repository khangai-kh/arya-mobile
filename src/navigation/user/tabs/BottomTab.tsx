import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, TouchableWithoutFeedback, View, StyleSheet, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Events } from '../../../screens/Events';
import { Home } from '../../../screens/Home';
import { Messenger } from '../../../screens/Messenger';
import { Profile } from '../../../screens/Profile';
import { MainStackParams } from '../../../models/navigation';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends MainStackParams {}
    }
}

export type BottomTabStackParams = {
    Home: undefined;
    Events: undefined;
    BottomTab: undefined;
    Messenger: undefined;
    Profile: undefined;
};

const BottomTabStack = createBottomTabNavigator<BottomTabStackParams>();

const styles = StyleSheet.create({

    tabBarStyle: {
        height: 80,
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        borderTopColor: 'transparent',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 5,
        paddingTop: 16,
    },
    tabBarItemStyle: {
        paddingBottom: 8,
        justifyContent: 'center',
    },
    tabIcon: {
        width: 28,
        height: 28,
        color: '#b2469d',
    },
    floatingButton: {
        width: 50,
        height: 50,
        borderRadius: 32,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
    floatingIcon: {
        width: 50,
        height: 50,
    },
});

const renderTabIcon = (focused: boolean, sourceFocused: any, sourceUnfocused: any, color: string) => (
    <Image
        source={focused ? sourceFocused : sourceUnfocused}
        style={[styles.tabIcon, { tintColor: focused ? '#b2469d' : '#9e9e9e' }]}
    />
);

const CustomTabButton = () => (
    <TouchableWithoutFeedback>
        <View style={styles.floatingButton}>
            <Image
                source={require('../../../assets/bottom-tab.png')}
                style={styles.floatingIcon}
            />
        </View>
    </TouchableWithoutFeedback>
);

export const BottomTab = () => {
    const { colors } = useTheme();

    return (
        <BottomTabStack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: colors.onSurface,
                tabBarStyle: styles.tabBarStyle,
                tabBarItemStyle: styles.tabBarItemStyle,
                tabBarShowLabel: false,
            }}
        >
            <BottomTabStack.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, focused }) =>
                        renderTabIcon(
                            focused,
                            require('../../../assets/flat-icons/home.png'),
                            require('../../../assets/flat-icons/home-outlined.png'),
                            color
                        ),
                }}
            />
            <BottomTabStack.Screen
                name="Events"
                component={Events}
                options={{
                    tabBarIcon: ({ color, focused }) =>
                        renderTabIcon(
                            focused,
                            require('../../../assets/flat-icons/calendar-star.png'),
                            require('../../../assets/flat-icons/calendar-star-outlined.png'),
                            color
                        ),
                }}
            />
            <BottomTabStack.Screen
                name="BottomTab"
                component={() => null}
                options={{
                    tabBarButton: CustomTabButton,
                }}
            />
            <BottomTabStack.Screen
                name="Messenger"
                component={Messenger}
                options={{
                    tabBarIcon: ({ color, focused }) =>
                        renderTabIcon(
                            focused,
                            require('../../../assets/flat-icons/comment-alt.png'),
                            require('../../../assets/flat-icons/comment-alt-outlined.png'),
                            color
                        ),
                }}
            />
            <BottomTabStack.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color, focused }) =>
                        renderTabIcon(
                            focused,
                            require('../../../assets/flat-icons/user.png'),
                            require('../../../assets/flat-icons/user-outlined.png'),
                            color
                        ),
                }}
            />
        </BottomTabStack.Navigator>
    );
};
