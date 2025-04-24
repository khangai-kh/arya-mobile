import { useSelector } from 'react-redux';
import { RootState } from './../redux/configureStore';
import { Guest } from './guest';
import { User } from './user';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParams } from '../models/navigation';

type NavigationProp = NativeStackNavigationProp<MainStackParams>;

export const Navigation = () => {
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const isLoggedIn = useSelector((state: RootState) => !!state.auth.token);
    const isLoggedOut = useSelector((state: RootState) => state.auth.logout);
    const navigation = useNavigation<NavigationProp>();

    useEffect(() => {
        if (!isLoggedIn && isLoggedOut === 1) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'SignIn' }],
            });
        }
    }, [isLoggedIn, isInitialLoad, navigation, isLoggedOut]);

    return isLoggedIn ? User() : Guest({isInitialLoad});
};
