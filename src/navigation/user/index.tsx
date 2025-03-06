
import { MainStack } from './stacks/Main';
import React, { Fragment } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StartUpForm } from '../../components/forms/StartUpForm';
import { useNavigation } from '@react-navigation/native';

export const User = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName="MainStack"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Group>
                <Fragment>
                    <Stack.Screen
                        name="MainStack"
                        component={MainStack}
                    />
                </Fragment>
            </Stack.Group>
        </Stack.Navigator>
    );
};
