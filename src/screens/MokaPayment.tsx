import React, { useState } from 'react';
import { View, Button, TextInput, Alert, Image } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  MokaPayment: undefined;
  ThreeDSecureScreen: { redirectUrl: string };
  PaymentResultScreen: { isSuccessful: string | null; resultCode: string | null; resultMessage: string | null; trxCode: string | null };
};

type MokaPaymentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MokaPayment'>;

type Props = {
  navigation: MokaPaymentScreenNavigationProp;
};

const MokaPayment: React.FC<Props> = ({ navigation }) => {
  const [cardHolderFullName, setCardHolderFullName] = useState('Baran Can Aydın');
  const [cardNumber, setCardNumber] = useState('4543 6090 7161 0384');
  const [expMonth, setExpMonth] = useState('01');
  const [expYear, setExpYear] = useState('28');
  const [cvcNumber, setCvcNumber] = useState('035');
  const [amount, setAmount] = useState('1');

  const handlePayment = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post('https://dev.aryawomen.com/api/mokapos/payment/3d', {
        CardHolderFullName: cardHolderFullName,
        CardNumber: cardNumber,
        ExpMonth: expMonth,
        ExpYear: `20${expYear}`,
        CvcNumber: cvcNumber,
        Amount: parseFloat(amount),
        Currency: 'TL',
        InstallmentNumber: 1,
        VirtualPosOrderId: 'test-order-001',
        VoidRefundReason: 0,
        ClientIP: '127.0.0.1',
        RedirectUrl: 'https://dev.aryawomen.com/moka-pos/payment-result',
        UtilityCompanyBillId: 0,
        DealerStaffId: 0,
      });

      const redirectUrl = response.data.redirectUrl;
      navigation.navigate('ThreeDSecureScreen', { redirectUrl });

    } catch (error: any) {
      console.error("Payment error", error.response?.data || error.message);
      Alert.alert('Ödeme başlatılırken bir hata oluştu.');
    }
  };

  const validateForm = () => {
    if (!cardHolderFullName || !cardNumber || !expMonth || !expYear || !cvcNumber || !amount) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return false;
    }

    const cardNumberCleaned = cardNumber.replace(/\s/g, '');
    const cardNumberPattern = /^[0-9]{16}$/;
    if (!cardNumberPattern.test(cardNumberCleaned)) {
      Alert.alert('Hata', 'Geçerli bir 16 haneli kart numarası girin.');
      return false;
    }

    if (expMonth.length !== 2 || parseInt(expMonth) < 1 || parseInt(expMonth) > 12) {
      Alert.alert('Hata', 'Son kullanma ayı 01 ile 12 arasında olmalıdır.');
      return false;
    }

    if (expYear.length !== 2 && expYear.length !== 4) {
      Alert.alert('Hata', 'Son kullanma yılı 2 veya 4 haneli olmalıdır.');
      return false;
    }

    if (cvcNumber.length !== 3 || !/^\d{3}$/.test(cvcNumber)) {
      Alert.alert('Hata', 'CVC numarası 3 haneli olmalıdır.');
      return false;
    }

    if (isNaN(parseFloat(amount.replace(',', '.')))) {
      Alert.alert('Hata', 'Geçerli bir tutar girin.');
      return false;
    }

    return true;
  };

  return (
    <View style={{ padding: 20, backgroundColor: '#f9f9f9', borderRadius: 12 }}>
    {/* <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
      <Image source={require('../assets/visa.png')} style={{ width: 60, height: 40, marginRight: 10 }} resizeMode="contain" />
      <Image source={require('../assets/master.png')} style={{ width: 60, height: 40 }} resizeMode="contain" />
    </View> */}
  
    <TextInput
      placeholder="Kart Sahibi Adı"
      value={cardHolderFullName}
      onChangeText={setCardHolderFullName}
      style={{
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        backgroundColor: '#fff',
      }}
    />
  
    <TextInput
      placeholder="Kart Numarası"
      value={cardNumber}
      onChangeText={setCardNumber}
      style={{
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        backgroundColor: '#fff',
      }}
      keyboardType="numeric"
    />
  
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
      <TextInput
        placeholder="Ay (MM)"
        value={expMonth}
        onChangeText={setExpMonth}
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 10,
          padding: 12,
          backgroundColor: '#fff',
          marginBottom: 12,
        }}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Yıl (YY)"
        value={expYear}
        onChangeText={setExpYear}
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 10,
          padding: 12,
          backgroundColor: '#fff',
          marginBottom: 12,
        }}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="CVC"
        value={cvcNumber}
        onChangeText={setCvcNumber}
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 10,
          padding: 12,
          backgroundColor: '#fff',
          marginBottom: 12,
        }}
        keyboardType="numeric"
      />
    </View>
  
    <TextInput
      placeholder="Tutar"
      value={amount}
      onChangeText={setAmount}
      keyboardType="numeric"
      style={{
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        backgroundColor: '#fff',
      }}
    />
  
    <Button title="Ödeme Yap" onPress={handlePayment} />
  </View>
  );
};

export default MokaPayment;
