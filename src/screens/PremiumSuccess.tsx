import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Image, View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { MainStackParams } from '../models/navigation';

type PremiumSuccessProps = StackScreenProps<MainStackParams, 'PremiumSuccess'>;

export const PremiumSuccess = ({ navigation }: PremiumSuccessProps) => {

    return (
        <SafeAreaView style={styles.safeArea} edges={['bottom']}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text variant="titleLarge" style={styles.title}>
                            Welcome to Premium Membership!
                    </Text>
                    <Text style={styles.description}>
                        You now have full access to all exclusive features and opportunities within the Arya community. Let's get started!
                    </Text>
                </View>
                <Image source={require('../assets/premium.png')} style={styles.image} />
            </View>
            <Box px={16} py={16}>
                <Button mode="contained" onPress={() => navigation.navigate('BottomTab')}>
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

