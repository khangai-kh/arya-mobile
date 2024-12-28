import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import { Image, TouchableWithoutFeedback, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Events } from '../screens/Events';
import { Home } from '../screens/Home';
import { Messenger } from '../screens/Messenger';
import { Profile } from '../screens/Profile';
import { AppStackParams } from './App';

type BottomTabProps = StackScreenProps<AppStackParams, 'BottomTab'>;

export type BottomTabStackParams = {
    Home: undefined;
    Events: undefined;
    BottomTab: undefined;
    Messenger: undefined;
    Profile: undefined;
};

const BottomTabStack = createBottomTabNavigator<BottomTabStackParams>();

export const BottomTab = (props: BottomTabProps) => {
    const { colors } = useTheme();
    const PlaceholderComponent = () => <View />;

    return (
        <BottomTabStack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: colors.onSurface,
                tabBarStyle: {
                    height: 100,
                    paddingTop: 12,
                    borderTopColor: colors.outlineVariant,
                    backgroundColor: colors.background
                },
                tabBarItemStyle: {
                    padding: 8,
                    justifyContent: 'center'
                },
                tabBarShowLabel: false
            }}
        >
            <BottomTabStack.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <Image
                            source={
                                focused
                                    ? require('../assets/flat-icons/home.png')
                                    : require('../assets/flat-icons/home-outlined.png')
                            }
                            style={{
                                width: 24,
                                height: 24,
                                tintColor: color
                            }}
                        />
                    )
                }}
            />
            <BottomTabStack.Screen
                name="Events"
                component={Events}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <Image
                            source={
                                focused
                                    ? require('../assets/flat-icons/calendar-star.png')
                                    : require('../assets/flat-icons/calendar-star-outlined.png')
                            }
                            style={{
                                width: 24,
                                height: 24,
                                tintColor: color
                            }}
                        />
                    )
                }}
            />
            <BottomTabStack.Screen
                name="BottomTab"
                component={() => null}
                options={{
                    tabBarButton: () => (
                        <TouchableWithoutFeedback>
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Image
                                    source={require('../assets/bottom-tab.png')}
                                    style={{
                                        width: 48,
                                        height: 48,
                                    }}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    ),
                }}
            />
            <BottomTabStack.Screen
                name="Messenger"
                component={Messenger}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <Image
                            source={
                                focused
                                    ? require('../assets/flat-icons/comment-alt.png')
                                    : require('../assets/flat-icons/comment-alt-outlined.png')
                            }
                            style={{
                                width: 24,
                                height: 24,
                                tintColor: color
                            }}
                        />
                    )
                }}
            />
            <BottomTabStack.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <Image
                            source={
                                focused
                                    ? require('../assets/flat-icons/user.png')
                                    : require('../assets/flat-icons/user-outlined.png')
                            }
                            style={{
                                width: 24,
                                height: 24,
                                tintColor: color
                            }}
                        />
                    )
                }}
            />
        </BottomTabStack.Navigator>
    );
};
