import { StackScreenProps } from '@react-navigation/stack';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStackParams } from '../navigation/App';

type SignUpProps = StackScreenProps<AppStackParams, 'SignUp'>;

export const SignUp = (props: SignUpProps) => {

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