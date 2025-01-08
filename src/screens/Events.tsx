import { StackScreenProps } from '@react-navigation/stack';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStackParams } from '../navigation/App';

type EventsProps = StackScreenProps<AppStackParams, 'Events'>;

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
