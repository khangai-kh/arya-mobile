import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Image, View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '../components/common/Box';
import { MainStackParams } from '../models/navigation';

type FundingSuccessProps = StackScreenProps<MainStackParams, 'FundingSuccess'>;

export const FundingSuccess = ({ navigation, route }: FundingSuccessProps) => {
    const startupId = route.params?.id;
    return (
        <SafeAreaView style={styles.safeArea} edges={['bottom']}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text variant="titleLarge" style={styles.title}>
                        Application Submitted
                    </Text>
                    <Text style={styles.description}>
                        Your funding round details have been sent to the Arya team for approval. You will be notified once the review is complete.
                    </Text>
                </View>
                <Image source={require('../assets/confirmation-sent.png')} style={styles.image} />
            </View>
            <Box px={16} py={16}>
                <Button mode="contained" onPress={() => navigation.navigate('Startup', { id: startupId || 0 })}>
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
    },
});

