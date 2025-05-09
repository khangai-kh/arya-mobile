import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Fragment } from 'react';
import { MainStackParams } from '../../models/navigation';
import { CreateProfile } from '../../screens/CreateProfile';
import { SignIn } from '../../screens/SignIn';
import { SignUp } from '../../screens/SignUp';
import { SignUpSuccess } from '../../screens/SignUpSuccess';
import { SplashScreen } from '../../screens/SplashScreen';
import { CalendarlyScreen } from '../../screens/CalendarlyScreen';
import { DisclosureText } from '../../screens/DisclosureText';

const Stack = createNativeStackNavigator<MainStackParams>();

interface GuestProps {
    isInitialLoad: boolean;
}

export const Guest = ({ isInitialLoad }: GuestProps) => {
    return (
        <Stack.Navigator
            initialRouteName={isInitialLoad ? 'SplashScreen' : 'SignIn'}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Group>
                <Fragment>
                    <Stack.Screen
                        name="SplashScreen"
                        component={SplashScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="SignIn"
                        component={SignIn}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="SignUp"
                        component={SignUp}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="SignUpSuccess"
                        component={SignUpSuccess}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="CreateProfile"
                        component={CreateProfile}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="CalendarlyScreen"
                        component={CalendarlyScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="DisclosureText"
                        component={DisclosureText}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Fragment>
            </Stack.Group>
        </Stack.Navigator>
    );
};
