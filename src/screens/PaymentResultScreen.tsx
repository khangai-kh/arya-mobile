import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// RootStackParamList'i tekrar tanımlayarak ekranlar arasındaki geçişi sağlıyoruz.
type RootStackParamList = {
  ThreeDSecureScreen: { redirectUrl: string };
  PaymentResultScreen: {
    isSuccessful: string | null;
    resultCode: string | null;
    resultMessage: string | null;
    trxCode: string | null;
  };
};

type Props = {
  route: RouteProp<RootStackParamList, 'PaymentResultScreen'>;
  navigation: StackNavigationProp<RootStackParamList, 'PaymentResultScreen'>;
};

const PaymentResultScreen: React.FC<Props> = ({ route, navigation }) => {
  const { isSuccessful, resultCode, resultMessage, trxCode } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Ödeme Sonucu</Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        {isSuccessful === 'true' ? 'Ödeme Başarılı!' : 'Ödeme Başarısız!'}
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>Sonuç Kodu: {resultCode}</Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>Sonuç Mesajı: {resultMessage}</Text>
      <Text style={{ fontSize: 16, marginBottom: 20 }}>İşlem Kodu: {trxCode}</Text>


    </View>
  );
};

export default PaymentResultScreen;
