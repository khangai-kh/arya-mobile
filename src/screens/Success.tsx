import { StackScreenProps } from '@react-navigation/stack';
import { Image, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { MainStackParams } from '../models/navigation';

type SuccessProps = StackScreenProps<MainStackParams, 'Success'>;

export const Success = (props: SuccessProps) => {

    const {
        navigation,
        route
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
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                }}
            >
                <View
                    style={{
                        padding: 16
                    }}
                >
                    <Text variant='titleLarge'>
                        Your application received
                    </Text>
                    <Text
                        style={{
                            marginTop: 12,
                            textAlign: 'center'
                        }}
                    >
                        You have started your Individual Participation Investor (IPI) License application process. Our team will contact you as soon as possible.
                    </Text>
                </View>
                <Image
                    source={require('../assets/success.png')}
                    style={{
                        width: 136,
                        height: 300
                    }}
                />
            </View>
            <Box
                px={16}
                py={16}
            >
                <Button
                    mode="contained"
                    onPress={() => {
                        navigation.navigate('BottomTab');
                    }}
                >
                    Homepage
                </Button>
            </Box>
        </SafeAreaView>
    );
};