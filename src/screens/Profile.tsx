import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStackParams } from '../navigation/App';

type ProfileProps = StackScreenProps<AppStackParams, 'Profile'>;

export const Profile = (props: ProfileProps) => {
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
