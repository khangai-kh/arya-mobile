import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStackParams } from '../navigation/App';

type NotificationsProps = StackScreenProps<AppStackParams, 'Notifications'>;

export const Notifications = (props: NotificationsProps) => {
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