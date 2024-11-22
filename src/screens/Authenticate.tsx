import { StackScreenProps } from '@react-navigation/stack';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStackParams } from '../navigation/App';

type AuthenticateProps = {
    setAccessToken: (accessToken: string | null) => void;
    setUser: (user: any) => void;
};

export const Authenticate = (props: StackScreenProps<AppStackParams, 'Authenticate'>) => {

    const {

    } = props;

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

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};