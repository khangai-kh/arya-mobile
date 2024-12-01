import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { Appbar } from 'react-native-paper';
import { AboutUs } from '../screens/AboutUs';
import { Authenticate } from '../screens/Authenticate';
import { ExternalWeb } from '../screens/ExternalWeb';
import { ForgotPassword } from '../screens/ForgotPassword';
import { MemberShip } from '../screens/MemberShip';
import { Notifications } from '../screens/Notifications';
import { OnBoarding } from '../screens/OnBoarding';
import { SignUp } from '../screens/SignUp';
import { BottomTab } from './BottomTab';

export type AppStackParams = {
    AboutUs: undefined;
    Authenticate: undefined;
    CheckIn: undefined;
    ChangePassword: undefined;
    BottomTab: undefined;
    ForgotPassword: undefined;
    Notifications: undefined;
    OnBoarding: undefined;
    SignUp: undefined;
    MemberShip: undefined;
    Messenger: undefined;
    Profile: undefined;
    ExternalWeb: {
        url: string;
    };
};

const AppStack = createStackNavigator<AppStackParams>();

export const App = () => {
    return (
        <AppStack.Navigator
            initialRouteName="BottomTab"
            screenOptions={{
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerTitleStyle: {
                    fontFamily: 'Nunito-Bold',
                    fontSize: 16,
                    fontWeight: Platform.OS === 'ios' ? '700' : undefined,
                    color: 'rgb(26, 37, 77)',
                },
                headerTitleAlign: 'center',
                headerLeft: (props) => {
                    if (!props.canGoBack) {
                        return null;
                    }
                    return (
                        <Appbar.Action
                            icon={require('../assets/flat-icon/chevron-left.png')}
                            onPress={props.onPress}
                        />
                    );
                },
            }}
        >
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
                name="OnBoarding"
                component={OnBoarding}
                options={{
                    headerShown: false,
                }}
            />
            <AppStack.Screen
                name="MemberShip"
                component={MemberShip}
                options={{
                    title: 'Membership',
                }}
            />
            <AppStack.Screen
                name="Authenticate"
                component={Authenticate}
                options={{
                    title: 'Sign In',
                }}
            />
            <AppStack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{
                    title: 'Forgot Password',
                }}
            />
            <AppStack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    title: 'Sign Up',
                }}
            />
            <AppStack.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    title: 'Notifications',
                }}
            />
            <AppStack.Screen
                name="ExternalWeb"
                component={ExternalWeb}
                options={{
                    title: 'ExternalWeb',
                    headerLeft: (props) => (
                        <Appbar.Action
                            icon={require('../assets/flat-icon/x.png')}
                            onPress={props.onPress}
                        />
                    ),
                }}
            />
        </AppStack.Navigator>
    );
};