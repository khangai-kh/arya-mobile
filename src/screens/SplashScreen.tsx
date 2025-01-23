import { StackScreenProps } from '@react-navigation/stack';
import { Image, KeyboardAvoidingView, Platform, useWindowDimensions, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStackParams } from '../navigation/App';

type SplashScreenProps = StackScreenProps<AppStackParams, 'SplashScreen'>;

export const SplashScreen = (props: SplashScreenProps) => {

    const {
        navigation,
    } = props;
    const { width, height } = useWindowDimensions();
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#F5EF99'
            }}
            edges={[
                'top'
            ]}
        >
            <KeyboardAvoidingView
                style={{
                    flex: 1
                }}
                behavior={
                    Platform.OS == 'android'
                        ? 'height'
                        : 'padding'
                }
            >
                <View
                    style={{
                        padding: 16
                    }}
                >
                    <View
                        style={{
                            marginTop: 40,
                            alignItems: 'center'
                        }}
                    >
                        <Image
                            source={require('../assets/aryaUP.png')}
                            style={{
                                width: 98,
                                height: 40,
                            }}
                            resizeMode='contain'
                        />
                        <Image
                            source={require('../assets/aryaekibi1.png')}
                            style={{
                                borderRadius: 32,
                                marginTop: 32,
                                width: width - 32,
                                height: height / 3,
                            }}
                            resizeMode='cover'
                        />
                    </View>
                    <Text
                        variant="titleLarge"
                        style={{
                            marginTop: 52,
                            fontFamily: 'PlayfairDisplay',
                            textAlign: 'center'
                        }}
                    >
                        “Shining stars are not afraid of others shining.”
                    </Text>
                    <Button
                        mode='contained'
                        style={{
                            marginTop: 52
                        }}
                    >
                        Discover Arya
                    </Button>
                    <Button
                        mode='contained'
                        style={{
                            marginTop: 12,
                            backgroundColor: '#fff',
                        }}
                    >
                        <Text>
                            Ready to join Arya
                        </Text>
                    </Button>
                    <View
                        style={{
                            marginTop: 32,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text>
                            Already have an account?
                        </Text>
                        <Button
                            mode='text'
                            onPress={() => navigation.navigate('SignIn')}
                        >
                            Sign in
                        </Button>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};