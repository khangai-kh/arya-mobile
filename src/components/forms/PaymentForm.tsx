import React, { useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParams } from '../../models/navigation';
import PaymentLocation from '../../components/PaymentLocation';
import { useTheme } from 'react-native-paper';

type Props = StackScreenProps<MainStackParams, 'PaymentLocation'>;

const PaymentForm: React.FC<Props> = ({ navigation }) => {
  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const { colors } = useTheme();
  // This callback will be called by PaymentLocation once the location has been determined.
  const handleLocationVerified = (isInTurkey: boolean) => {
    setIsVerifying(false);
    if (isInTurkey) {
      navigation.navigate('MokaPayment', { pricingPlanId: '1' });
    } else {
      navigation.navigate('StripePayment');
    }
  };

  return (
    <View style={styles.container}>
      {isVerifying && (
        <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
      )}
      <PaymentLocation
        onLocationVerified={handleLocationVerified}
        showUI={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
  },
});

export default PaymentForm;
