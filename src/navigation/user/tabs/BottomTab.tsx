import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Events } from '../../../screens/Events';
import { Home } from '../../../screens/Home';
import { Messenger } from '../../../screens/Messenger';
import { Profile } from '../../../screens/Profile';
import { MainStackParams } from '../../../models/navigation';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends MainStackParams { }
    }
}

 // type BottomTabProps = StackScreenProps<MainStackParams, 'BottomTab'>;

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
        height: 100,
        paddingTop: 12,
        borderTopColor: '#E0E0E0',
        backgroundColor: '#FFFFFF',
    },
    tabBarItemStyle: {
        padding: 8,
        justifyContent: 'center',
    },
    tabIcon: {
        width: 24,
        height: 24,
    },
    tabIconLarge: {
        width: 48,
        height: 48,
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const renderTabIcon = (focused: boolean, sourceFocused: any, sourceUnfocused: any, color: string) => (
    <Image
        source={focused ? sourceFocused : sourceUnfocused}
        style={[styles.tabIcon, { tintColor: color }]}
    />
);

const CustomTabButton = () => (
    <TouchableWithoutFeedback>
        <View style={styles.tabButton}>
            <Image
                source={require('../../../assets/bottom-tab.png')}
                style={styles.tabIconLarge}
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
