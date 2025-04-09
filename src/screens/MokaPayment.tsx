import React, { useState } from 'react';
import { View, Button, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';

// RootStackParamList, uygulamanızdaki tüm ekranların parametre tiplerini içermelidir.
type RootStackParamList = {
  MokaPayment: undefined;
  ThreeDSecureScreen: { redirectUrl: string };
  PaymentResultScreen: { isSuccessful: string | null; resultCode: string | null; resultMessage: string | null; trxCode: string | null };
};

// Navigation Prop türünü belirtin
type MokaPaymentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MokaPayment'>;

type Props = {
  navigation: MokaPaymentScreenNavigationProp;
};

const MokaPayment: React.FC<Props> = ({ navigation }) => {
  const [cardHolderFullName, setCardHolderFullName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvcNumber, setCvcNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handlePayment = async () => {
    try {
      const response = await axios.post('https://dev.aryawomen.com/api/mokapos/payment/3d', {
        PaymentDealerRequest: {
          CardHolderFullName: cardHolderFullName,
          CardNumber: cardNumber,
          ExpMonth: expMonth,
          ExpYear: expYear,
          CvcNumber: cvcNumber,
          Amount: parseFloat(amount),
          Currency: 'TL',
          InstallmentNumber: 1,
          VirtualPosOrderId: 'test-order-001',
          VoidRefundReason: 0,
          ClientIP: '127.0.0.1',
          RedirectUrl: 'https://example.com/PayResult',
          UtilityCompanyBillId: 0,
          DealerStaffId: 0,
        }
      });

      const redirectUrl = response.data.redirectUrl;

      // 3D ödeme sayfasına yönlendir
      navigation.navigate('ThreeDSecureScreen', { redirectUrl });

    } catch (error) {
      console.error("Payment error", error);
      Alert.alert('Ödeme başlatılırken bir hata oluştu.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Kart Sahibi Adı"
        value={cardHolderFullName}
        onChangeText={setCardHolderFullName}
        style={{ marginBottom: 10, borderBottomWidth: 1, padding: 5 }}
      />
      <TextInput
        placeholder="Kart Numarası"
        value={cardNumber}
        onChangeText={setCardNumber}
        style={{ marginBottom: 10, borderBottomWidth: 1, padding: 5 }}
      />
      <TextInput
        placeholder="Son Kullanma Ayı"
        value={expMonth}
        onChangeText={setExpMonth}
        style={{ marginBottom: 10, borderBottomWidth: 1, padding: 5 }}
      />
      <TextInput
        placeholder="Son Kullanma Yılı"
        value={expYear}
        onChangeText={setExpYear}
        style={{ marginBottom: 10, borderBottomWidth: 1, padding: 5 }}
      />
      <TextInput
        placeholder="CVC"
        value={cvcNumber}
        onChangeText={setCvcNumber}
        style={{ marginBottom: 10, borderBottomWidth: 1, padding: 5 }}
      />
      <TextInput
        placeholder="Tutar"
        value={amount}
        onChangeText={setAmount}
        style={{ marginBottom: 20, borderBottomWidth: 1, padding: 5 }}
      />
      <Button title="Ödeme Yap" onPress={handlePayment} />
    </View>
  );
};

export default MokaPayment;
