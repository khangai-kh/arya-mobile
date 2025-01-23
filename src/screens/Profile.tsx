/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { AppStackParams } from '../navigation/App';
import { setAuthToken } from '../redux/auth/reducer';

type ProfileProps = StackScreenProps<AppStackParams, 'Profile'> & {
    setAuthToken: (accessToken: string | null) => void;
};

const mapDispatchToProps = {
    setAuthToken,
};

const ProfileComponent = ({ navigation, setAuthToken }: ProfileProps) => {
    const handleLogout = () => {
        setAuthToken(null);
        navigation.reset({
            index: 0,
            routes: [{ name: 'SplashScreen' }],
        });
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            edges={['top']}
        >
            <Button
                mode="contained"
                onPress={handleLogout}
                style={{
                    marginTop: 20,
                    marginHorizontal: 16,
                }}
            >
                Log Out
            </Button>
        </SafeAreaView>
    );
};

export const Profile = connect(null, mapDispatchToProps)(ProfileComponent);
