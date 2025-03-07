
import { MainStack } from './stacks/Main';
import React, { Fragment } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
