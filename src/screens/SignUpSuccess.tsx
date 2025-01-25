import { StackScreenProps } from '@react-navigation/stack';
import { Image, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { MainStackParams } from '../models/navigation';

type SignUpSuccessProps = StackScreenProps<MainStackParams, 'SignUpSuccess'>;

export const SignUpSuccess = (props: SignUpSuccessProps) => {

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
                    <Text
                        variant='titleLarge'
                        style={{
                            textAlign: 'center',
                            paddingHorizontal: 32
                        }}
                    >
                        Welcome to Your Personalized Experience
                    </Text>
                    <Text
                        style={{
                            marginTop: 12,
                            textAlign: 'center'
                        }}
                    >
                        Let’s set up your profile and discover areas that match your interests.
                    </Text>
                </View>
                <Image
                    source={require('../assets/success.png')}
                    style={{
                        marginTop: 8,
                        paddingHorizontal: 16,
                        width: '100%',
                        height: '40%'
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
                    Get Started
                </Button>
            </Box>
        </SafeAreaView>
    );
};