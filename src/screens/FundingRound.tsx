// src/screens/FundingRound.tsx

import React from 'react';
import { StyleSheet, Alert, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';

import { MainStackParams } from '../models/navigation';
import {
  FundingRoundForm,
  FundingRoundFormValues,
} from '../components/forms/FundingRoundForm';
import { Appbar, MD3Theme, Text, useTheme } from 'react-native-paper';

type FundingRoundProps = StackScreenProps<MainStackParams, 'FundingRound'>;

export const FundingRound = ({ navigation, route }: FundingRoundProps) => {
    const { colors } = useTheme();
    const dynamicStyles = createDynamicStyles(colors);
    const handleSubmit = (values: FundingRoundFormValues) => {
        // TODO: replace with real API call
        console.log('Funding round values:', values);
        Alert.alert('Success', 'Funding round created!');
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <Appbar.Header style={styles.appbarHeader}>
                <Appbar.Action
                    icon={require('../assets/flat-icons/angle-small-left.png')}
                    color="#414042"
                    size={20}
                    style={dynamicStyles.appbarActionRight}
                    onPress={() => navigation.goBack()}
                />
                <Appbar.Content
                    title={
                        <View style={dynamicStyles.titleContainer}>
                            <Text variant="titleMedium" style={dynamicStyles.interestText}>
                                Funding Round
                            </Text>
                        </View>
                    }
                />
            </Appbar.Header>
            <FundingRoundForm
                onSubmit={handleSubmit}
                onCancel={() => navigation.goBack()}
            />
        </SafeAreaView>
    );
};
const createDynamicStyles = (colors: MD3Theme['colors']) =>
    StyleSheet.create({appbarActionRight: {
        backgroundColor: colors.onPrimary || '#FFFFFF',
        marginRight: 5,
        marginTop: 20,
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    interestText: {
        fontWeight: 'bold',
        paddingLeft: 0,
        marginLeft:-40,
    },
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    appbarHeader: {
        width: '100%',
        backgroundColor: 'transparent',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
});
