import { View } from 'react-native';
import { Text } from 'react-native-paper';

type SpecialProps = {
    icon: string;
    value: string;
};

export const Special = (props: SpecialProps) => {
    const {
        icon,
        value
    } = props;

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#F5EF99',
                borderRadius: 16,

            }}
        >
            <Text>
                {value}
            </Text>
        </View>
    );
};