import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import { Image, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Home } from '../screens/Home';
import { Messenger } from '../screens/Messenger';
import { Profile } from '../screens/Profile';
import { AppStackParams } from './App';

type BottomTabProps = StackScreenProps<AppStackParams, 'BottomTab'>;

export type BottomTabStackParams = {
    Home: undefined;
    Messenger: undefined;
    Profile: undefined;
};

const BottomTabStack = createBottomTabNavigator<BottomTabStackParams>();

export const BottomTab = (props: BottomTabProps) => {
    const { colors } = useTheme();

    return (
        <BottomTabStack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: colors.onSurface,
                tabBarStyle: {
                    borderTopColor: colors.outlineVariant,
                    backgroundColor: colors.background
                },
                tabBarLabelStyle: {
                    fontFamily: 'Nunito-Bold',
                    fontSize: 12,
                    fontWeight: Platform.OS === 'ios' ? '700' : undefined
                }
            }}
        >
            <BottomTabStack.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require('../assets/flat-icon/home.png')}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: color
                            }}
                        />
                    )
                }}
            />
            <BottomTabStack.Screen
                name="Messenger"
                component={Messenger}
                options={{
                    tabBarLabel: 'Messenger',
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require('../assets/flat-icon/message.png')}
                            style={{
                                width: 20,
                                height: 20,
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
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require('../assets/flat-icon/profile.png')}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: color
                            }}
                        />
                    )
                }}
            />
        </BottomTabStack.Navigator>
    );
};
