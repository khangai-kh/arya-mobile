import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStackParams } from '../navigation/App';

type AboutUsProps = StackScreenProps<AppStackParams, 'AboutUs'>;

export const AboutUs = (props: AboutUsProps) => {
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
