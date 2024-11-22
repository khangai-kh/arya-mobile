import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStackParams } from '../navigation/App';

type ForgotPasswordProps = StackScreenProps<AppStackParams, 'ForgotPassword'>;

export const ForgotPassword = (props: ForgotPasswordProps) => {
    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
            edges={[
                'bottom'
            ]}
        >

        </SafeAreaView>
    );
};