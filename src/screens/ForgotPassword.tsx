import { KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ForgotPassword = () => {
    return (
        <SafeAreaView
            style={{ flex: 1 }}
            edges={['top']}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text>
                        Forget password
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};;