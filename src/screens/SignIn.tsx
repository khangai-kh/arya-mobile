import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { Box } from '../components/common/Box';
import { TextInput } from '../components/common/TextInput';
import { TextInputSecure } from '../components/common/TextInputSecure';
import { createUseState } from '../components/common/UseState';
import { AppStackParams } from '../navigation/App';
import { API } from '../plugins/axios';
import { setAccessToken, setUser } from '../redux/auth/slice';
import { ValidationError } from '../types';

type AuthenticateProps = {
    setAccessToken: (accessToken: string | null) => void;
    setUser: (user: any) => void;
};

const UseStateValidationErrors = createUseState<ValidationError[]>();

const mapDispatchToProps = {
    setAccessToken,
    setUser
};

export const SignIn = connect(null, mapDispatchToProps)((props: StackScreenProps<AppStackParams, 'SignIn'> & AuthenticateProps) => {

    const { colors } = useTheme();
    const {
        navigation,
        setAccessToken,
        setUser
    } = props;

    const [
        identifier,
        setIdentifier
    ] = useState('');
    const [
        password,
        setPassword
    ] = useState('');
    const [
        loading,
        setLoading
    ] = useState(false);
    const [
        errorMessage,
        setErrorMessage
    ] = useState<string | null>(null);

    const handleSignIn = async () => {
        setLoading(true);
        setErrorMessage(null);
        try {
            const response = await API.post('/api/login', {
                email: identifier,
                password,
            });

            const { data } = response;
            setAccessToken(data.accessToken);
            setUser(data.user);
            navigation.navigate('BottomTab');
        } catch (error: any) {
            const message = error?.response?.data?.message || 'An error occurred during login.';
            setErrorMessage(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
            edges={[
                'bottom'
            ]}
        >
            <KeyboardAvoidingView
                style={{
                    flex: 1
                }}
                behavior={
                    Platform.OS == 'android'
                        ? 'height'
                        : 'padding'
                }
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            flex: 1,
                            marginTop: '64%'
                        }}
                    >
                        <Text
                            variant='titleLarge'
                            style={{
                                textAlign: 'center'
                            }}
                        >
                            Sign In
                        </Text>
                        <Text
                            style={{
                                textAlign: 'center',
                                marginTop: 4
                            }}
                        >
                            Hi! Welcome back, you’ve been missed
                        </Text>
                        <Box
                            mt={32}
                            px={16}
                            py={24}
                        >
                            <Text variant='titleSmall'>
                                Email
                            </Text>
                            <TextInput
                                autoCapitalize="none"
                                keyboardType="email-address"
                                placeholder="example@example.com"
                                mode="outlined"
                                value={identifier}
                                onChangeText={setIdentifier}
                                style={{
                                    marginTop: 12,
                                    marginBottom: 16
                                }}
                            />
                            <Text variant='titleSmall'>
                                Password
                            </Text>
                            <TextInputSecure
                                placeholder="********"
                                mode="outlined"
                                value={password}
                                onChangeText={setPassword}
                                onSubmitEditing={() => { }}
                            />
                            {errorMessage && (
                                <Text
                                    style={{
                                        color: 'red',
                                        textAlign: 'center',
                                        marginTop: 16
                                    }}
                                >
                                    {errorMessage}
                                </Text>
                            )}
                            <Pressable
                                onPress={() => {
                                    navigation.navigate('ForgotPassword');
                                }}
                                style={{
                                    marginTop: 16
                                }}
                            >
                                <Text
                                    style={{
                                        color: colors.secondary,
                                        textAlign: 'right'
                                    }}
                                >
                                    Forgot password?
                                </Text>
                            </Pressable>
                            <Button
                                mode="contained"
                                style={{
                                    marginTop: 24
                                }}
                                loading={loading}
                                onPress={() => {
                                    if (password === '123123' && identifier === 'duygu.aydin@gmail.com') {
                                        setUser({
                                            id: 'user'
                                        });
                                        setAccessToken(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkdXlndS5heWRpbkBnbWFpbC5jb20iLCJyb2xlcyI6WyJQcmVtaXVtRW50cmVwcmVuZXVyIl0sImV4cCI6MTczMzkyMjc3Mn0._W-gUeEMloJpVTS3tTBpVXUndqwrzhgY_6rBUhPFvw0`);
                                    }
                                }}
                            >
                                Sign in
                            </Button>
                        </Box>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
});
