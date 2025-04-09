import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParams } from '../../models/navigation';
import PaymentLocation from '../../components/PaymentLocation';
import { Alert } from 'react-native';

type Props = StackScreenProps<MainStackParams, 'PaymentLocation'>;

export const PaymentForm = ({ navigation }: Props) => {
  
  const handleLocationVerified = (isInTurkey: boolean) => {
    if (isInTurkey) {
      Alert.alert("Test Sonucu", "Yurtiçi konum algılandı 🌍", [
        { text: "Ödeme Yap", onPress: () => navigation.navigate("MokaPayment") },
        { text: "İptal", style: "cancel" }
      ]);
    } else {
      Alert.alert("Test Sonucu", "Yurtdışı konum algılandı 🌍", [
        { text: "Ödeme Yap", onPress: () => navigation.navigate("StripePayment") }, // Stripe Ödeme Sayfasına Git
        { text: "İptal", style: "cancel" }
      ]);
    }
  };

  return (
    <PaymentLocation 
      onLocationVerified={handleLocationVerified}
      showUI={true}
    />
  );
};

export default PaymentForm;
