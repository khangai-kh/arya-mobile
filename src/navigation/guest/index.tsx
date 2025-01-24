import React, { Fragment } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from '../../screens/SignIn';
 //import { SignUp } from '../../screens/SignUp';
import { SplashScreen } from '../../screens/SplashScreen';

const Stack = createNativeStackNavigator();

export const Guest = () => {
    return (
        <Stack.Navigator
            initialRouteName="SplashScreen"
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
                    {/* <Stack.Screen
                        name="ForgotPassword"
                        component={ForgotPassword}
                        options={{
                            title: 'Forgot Password',
                        }}
                    />
                    <Stack.Screen
                        name="SignUp"
                        component={SignUp}
                        options={{
                            title: 'Sign Up',
                        }}
                    />*/}
                </Fragment>
            </Stack.Group>
        </Stack.Navigator>
    );
};
