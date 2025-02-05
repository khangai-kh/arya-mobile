import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Image, View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { MainStackParams } from '../models/navigation';

type SignUpSuccessProps = StackScreenProps<MainStackParams, 'SignUpSuccess'>;

export const SignUpSuccess = ({ navigation, route }: SignUpSuccessProps) => {

    let userId = '';
    let user = route.params?.userId;

    if (user && typeof user === 'object' && 'user_id' in (user as any)) {
        console.log('SignUpSuccess:', user);
        userId = (user as any).user_id;
        console.log('SignUpSuccess:', userId);
    } else if (!user) {
        userId = 'N/A';
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={['bottom']}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text variant="titleLarge" style={styles.title}>
                        Welcome to Your Personalized Experience
                    </Text>
                    <Text style={styles.description}>
                        Let's set up your profile and discover areas that match your interests.
                    </Text>
                </View>
                <Image source={require('../assets/success.png')} style={styles.image} />
            </View>
            <Box px={16} py={16}>
                <Button mode="contained" onPress={() => navigation.navigate('CreateProfile', { userId })}>
                    Get Started
                </Button>
            </Box>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    textContainer: {
        padding: 16,
    },
    title: {
        textAlign: 'center',
        paddingHorizontal: 32,
    },
    description: {
        marginTop: 12,
        textAlign: 'center',
    },
    userId: {
        marginTop: 12,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    image: {
        marginTop: 8,
        paddingHorizontal: 16,
        width: '100%',
        height: '40%',
    },
});

export default SignUpSuccess;
