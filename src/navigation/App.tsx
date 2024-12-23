import { createStackNavigator } from '@react-navigation/stack';
import { Fragment } from 'react';
import { Platform } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/configureStore';
import { AboutUs } from '../screens/AboutUs';
import { Announcement } from '../screens/Announcement';
import { Announcements } from '../screens/Announcements';
import { Content } from '../screens/Content';
import { ExternalWeb } from '../screens/ExternalWeb';
import { ForgotPassword } from '../screens/ForgotPassword';
import { Inspiration } from '../screens/Inspiration';
import { Inspirations } from '../screens/Inspirations';
import { Member } from '../screens/Member';
import { MemberShip } from '../screens/MemberShip';
import { Notifications } from '../screens/Notifications';
import { OnBoarding } from '../screens/OnBoarding';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';
import { SplashScreen } from '../screens/SplashScreen';
import { BottomTab } from './BottomTab';

export type AppStackParams = {
    AboutUs: undefined;
    Authenticate: undefined;
    Announcements: undefined;
    CheckIn: undefined;
    ChangePassword: undefined;
    BottomTab: undefined;
    Inspirations: undefined;
    ForgotPassword: undefined;
    Notifications: undefined;
    OnBoarding: undefined;
    SignIn: undefined;
    SignUp: undefined;
    SplashScreen: undefined;
    MemberShip: undefined;
    Messenger: undefined;
    Profile: undefined;
    Announcement: {
        id: string;
    };
    Content: {
        id: string;
    };
    Inspiration: {
        id: string;
    };
    Member: {
        role: string;
    };
    ExternalWeb: {
        url: string;
    };
};

const AppStack = createStackNavigator<AppStackParams>();

export const App = () => {
    const { colors } = useTheme();
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <AppStack.Navigator
            initialRouteName={user ? "BottomTab" : "SplashScreen"}
            screenOptions={{
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: colors.background
                },
                headerTitleStyle: {
                    fontFamily: 'Nunito-Bold',
                    fontSize: 16,
                    fontWeight: Platform.OS === 'ios' ? '700' : undefined,
                    color: 'rgb(65, 64, 66)'
                },
                headerTitleAlign: 'center',
                headerLeft: (props) => {
                    if (!props.canGoBack) {
                        return null;
                    }
                    return (
                        <Appbar.Action
                            icon={require('../assets/flat-icons/chevron-left.png')}
                            onPress={props.onPress}
                            style={{
                                backgroundColor: colors.onPrimary
                            }}
                        />
                    );
                },
            }}
        >
            <AppStack.Group>
                {user === null && (
                    <Fragment>
                        <AppStack.Screen
                            name="SignIn"
                            component={SignIn}
                            options={{
                                headerShown: false
                            }}
                        />
                        <AppStack.Screen
                            name="ForgotPassword"
                            component={ForgotPassword}
                            options={{
                                title: 'Forgot Password'
                            }}
                        />
                        <AppStack.Screen
                            name="SignUp"
                            component={SignUp}
                            options={{
                                title: 'Sign Up'
                            }}
                        />
                        <AppStack.Screen
                            name="SplashScreen"
                            component={SplashScreen}
                            options={{
                                headerShown: false
                            }}
                        />
                    </Fragment>
                )}
                {user && (
                    <Fragment>
                        <AppStack.Screen
                            name="BottomTab"
                            component={BottomTab}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <AppStack.Screen
                            name="AboutUs"
                            component={AboutUs}
                            options={{
                                title: 'About Us',
                            }}
                        />
                        <AppStack.Screen
                            name="Announcements"
                            component={Announcements}
                            options={{
                                title: 'Announcements',
                            }}
                        />
                        <AppStack.Screen
                            name="Announcement"
                            component={Announcement}
                            options={{
                                headerShown: false
                            }}
                        />
                        <AppStack.Screen
                            name="Content"
                            component={Content}
                            options={{
                                headerShown: false
                            }}
                        />
                        <AppStack.Screen
                            name="Inspiration"
                            component={Inspiration}
                            options={{
                                headerShown: false
                            }}
                        />
                        <AppStack.Screen
                            name="OnBoarding"
                            component={OnBoarding}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <AppStack.Screen
                            name="Member"
                            component={Member}
                            options={({ route }) => ({
                                title: route.params.role,
                            })}
                        />
                        <AppStack.Screen
                            name="MemberShip"
                            component={MemberShip}
                            options={{
                                title: 'Membership',
                            }}
                        />
                        <AppStack.Screen
                            name="Inspirations"
                            component={Inspirations}
                            options={{
                                title: 'Inspirations',
                            }}
                        />
                        <AppStack.Screen
                            name="Notifications"
                            component={Notifications}
                            options={{
                                title: 'Notifications',
                            }}
                        />
                    </Fragment>
                )}
                <AppStack.Screen
                    name="ExternalWeb"
                    component={ExternalWeb}
                    options={{
                        title: 'ExternalWeb',
                        headerLeft: (props) => (
                            <Appbar.Action
                                icon={require('../assets/flat-icons/x.png')}
                                onPress={props.onPress}
                            />
                        ),
                    }}
                />
            </AppStack.Group>
        </AppStack.Navigator>
    );
};
