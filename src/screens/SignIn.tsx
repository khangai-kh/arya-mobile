import { StackScreenProps } from '@react-navigation/stack';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { createUseState } from '../components/common/UseState';
import { AppStackParams } from '../navigation/App';
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
                            marginTop: '56.25%'
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
                                textAlign: 'center'
                            }}
                        >
                            Hi! Welcome back, you’ve been missed
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
});