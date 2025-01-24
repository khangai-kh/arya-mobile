import { StackScreenProps } from '@react-navigation/stack';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainStackParams } from '../models/navigation';

type EventsProps = StackScreenProps<MainStackParams, 'Events'>;

export const Events = (props: EventsProps) => {
    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
            edges={[
                'top'
            ]}
        >
            <Text
                variant='titleMedium'
                style={{
                    textAlign: 'center'
                }}
            >
                Events
            </Text>
        </SafeAreaView>
    );
};
