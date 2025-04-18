import React from 'react';
import { StyleSheet, Alert, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { Appbar, Text, useTheme, MD3Theme } from 'react-native-paper';
import { API } from '../plugins/axios';

import { MainStackParams } from '../models/navigation';
import {
  FundingRoundForm,
  FundingRoundFormValues,
} from '../components/forms/FundingRoundForm';
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

type FundingRoundProps = StackScreenProps<MainStackParams, 'FundingRound'>;

export const FundingRound = ({ navigation, route }: FundingRoundProps) => {
  const { colors } = useTheme();
  const dynamicStyles = createDynamicStyles(colors);

  const startup_id = route.params.id;

  const handleSubmit = async (values: FundingRoundFormValues) => {
    try {
     console.log('Startupid : ', startup_id);
      // 1) create the funding round
      await API.post('/api/startups/fundings', {
        startup_id: startup_id,
        funding_deadline: values.fundingDeadline,
        use_of_funds: values.useOfFunds,
        equity_offered: values.investmentTerms,
        investment_type: '',
        discount_on_future_rounds: values.minimumInvestmentAmount,
        maturity_date: values.fundingDeadline,
      });

      // 2) upload each pitch deck file
      for (const file of values.pitchDeck) {
        const formData = new FormData();

        formData.append('startup_id', startup_id);
        formData.append('file_name', file.name);
        formData.append('file', {
          uri: file.uri,
          type: file.type,
          name: file.name,
        } as any);

        await API.post('/api/startups/pitch-decks', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
            },
        });
      }

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: 'Funding round added',
        autoClose: 1000,
      });

      setTimeout(() => {
        navigation.navigate({ name: 'FundingSuccess', params: { id: startup_id } });
      }, 2000);

    } catch (error) {
      console.error('Funding creation error', error);
      Alert.alert('Error', 'Failed to create funding round.');
    }
  };

  return (
    <AlertNotificationRoot>
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
    </AlertNotificationRoot>
  );
};

const createDynamicStyles = (colors: MD3Theme['colors']) =>
  StyleSheet.create({
    appbarActionRight: {
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
      marginLeft: -40,
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
