import { createStackNavigator } from '@react-navigation/stack';
import { Fragment } from 'react';
import { Platform } from 'react-native';
import { Appbar, IconButton, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/configureStore';
import { AboutUs } from '../screens/AboutUs';
import { AcademyStartups } from '../screens/AcademyStartups';
import { Announcement } from '../screens/Announcement';
import { Announcements } from '../screens/Announcements';
import { BetterFutureCirclesDays } from '../screens/BetterFutureCirclesDays';
import { BKYLicense } from '../screens/BKYLicense';
import { ClosedDeals } from '../screens/ClosedDeals';
import { Content } from '../screens/Content';
import { ExternalWeb } from '../screens/ExternalWeb';
import { ForgotPassword } from '../screens/ForgotPassword';
import { Inspiration } from '../screens/Inspiration';
import { Inspirations } from '../screens/Inspirations';
import { InvestorTrainings } from '../screens/InvestorTrainings';
import { Member } from '../screens/Member';
import { MemberShip } from '../screens/MemberShip';
import { Notifications } from '../screens/Notifications';
import { OnBoarding } from '../screens/OnBoarding';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';
import { SplashScreen } from '../screens/SplashScreen';
import { Startup } from '../screens/Startup';
import { Startups } from '../screens/Startups';
import { Workshop } from '../screens/Workshop';
import { Workshops } from '../screens/Workshops';
import { BottomTab } from './BottomTab';

export type AppStackParams = {
    AboutUs: undefined;
    Authenticate: undefined;
    Announcements: undefined;
    AcademyStartups: undefined;
    BetterFutureCirclesDays: undefined;
    BottomTab: undefined;
    BKYLicense: undefined;
    CheckIn: undefined;
    ChangePassword: undefined;
    ClosedDeals: undefined;
    Events: undefined;
    Inspirations: undefined;
    InvestorTrainings: undefined;
    ForgotPassword: undefined;
    Notifications: undefined;
    OnBoarding: undefined;
    SignIn: undefined;
    SignUp: undefined;
    SplashScreen: undefined;
    Startups: undefined;
    MemberShip: undefined;
    Messenger: undefined;
    Profile: undefined;
    Workshops: undefined;
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
    Workshop: {
        id: string;
    };
    Startup: {
        id: string;
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
                            name="AcademyStartups"
                            component={AcademyStartups}
                            options={{
                                title: 'Venture academy startups'
                            }}
                        />
                        <AppStack.Screen
                            name="BetterFutureCirclesDays"
                            component={BetterFutureCirclesDays}
                            options={{
                                title: 'Better.Future.Circles.Days',
                            }}
                        />
                        <AppStack.Screen
                            name="BKYLicense"
                            component={BKYLicense}
                            options={{
                                title: 'BKY License',
                            }}
                        />
                        <AppStack.Screen
                            name="InvestorTrainings"
                            component={InvestorTrainings}
                            options={{
                                title: 'Investor trainings',
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
                            name="ClosedDeals"
                            component={ClosedDeals}
                            options={{
                                title: 'Closed deals',
                            }}
                        />
                        <AppStack.Screen
                            name="Startup"
                            component={Startup}
                            options={{
                                title: 'Startup',
                            }}
                        />
                        <AppStack.Screen
                            name="Startups"
                            component={Startups}
                            options={{
                                title: 'Startups in funding round',
                                headerRight: () => (
                                    <IconButton
                                        icon={require('../assets/flat-icons/search.png')}
                                        size={24}
                                        iconColor='#414042'
                                        style={{
                                            backgroundColor: '#F8E8F4'
                                        }}
                                        onPress={() => { }}
                                    />
                                ),
                            }}
                        />
                        <AppStack.Screen
                            name="Workshop"
                            component={Workshop}
                            options={{
                                headerShown: false
                            }}
                        />
                        <AppStack.Screen
                            name="Workshops"
                            component={Workshops}
                            options={{
                                title: 'Entrepreneur workshops',
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
                                headerRight: () => (
                                    <IconButton
                                        icon={require('../assets/flat-icons/menu.png')}
                                        size={24}
                                        iconColor='#414042'
                                        style={{
                                            backgroundColor: '#F8E8F4'
                                        }}
                                        onPress={() => { }}
                                    />
                                ),
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
