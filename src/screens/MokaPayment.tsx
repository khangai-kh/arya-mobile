import React, { useState } from 'react';
import { View, Button, TextInput, Alert, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
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
  const [cardHolderFullName, setCardHolderFullName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvcNumber, setCvcNumber] = useState('');
  const [amount, setAmount] = useState('1');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!validateForm()) return;
    setIsProcessing(true);

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
      Alert.alert('Ödeme Hatası', 'Ödeme başlatılırken bir hata oluştu. Lütfen bilgilerinizi kontrol edip tekrar deneyin.');
    } finally {
      setIsProcessing(false);
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

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.substring(0, 19);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>Ödeme Bilgileri</Text>
          <View style={styles.cardLogos}>
          <Image 
            source={{ uri: '../assets/flat-icons/master.png' }} 
            style={styles.cardLogo} 
            resizeMode="contain" />
          <Image 
            source={{ uri: '../assets/flat-icons/visa.png' }} 
            style={styles.cardLogo} 
            resizeMode="contain" />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Kart Sahibi</Text>
          <TextInput
            placeholder="Ad Soyad"
            value={cardHolderFullName}
            onChangeText={setCardHolderFullName}
            style={styles.input}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Kart Numarası</Text>
          <TextInput
            placeholder="0000 0000 0000 0000"
            value={formatCardNumber(cardNumber)}
            onChangeText={(text) => setCardNumber(text.replace(/\s/g, ''))}
            style={styles.input}
            keyboardType="numeric"
            maxLength={19}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.formGroup, { flex: 2 }]}>
            <Text style={styles.label}>Son Kullanma Tarihi</Text>
            <View style={styles.expiryRow}>
              <TextInput
                placeholder="AA"
                value={expMonth}
                onChangeText={(text) => setExpMonth(text.substring(0, 2))}
                style={[styles.input, styles.smallInput]}
                keyboardType="numeric"
                maxLength={2}
                placeholderTextColor="#999"
              />
              <Text style={styles.expirySeparator}>/</Text>
              <TextInput
                placeholder="YY"
                value={expYear}
                onChangeText={(text) => setExpYear(text.substring(0, 2))}
                style={[styles.input, styles.smallInput]}
                keyboardType="numeric"
                maxLength={2}
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <View style={[styles.formGroup, { flex: 1, marginLeft: 15 }]}>
            <Text style={styles.label}>CVC</Text>
            <TextInput
              placeholder="***"
              value={cvcNumber}
              onChangeText={(text) => setCvcNumber(text.substring(0, 3))}
              style={[styles.input, styles.smallInput]}
              keyboardType="numeric"
              maxLength={3}
              secureTextEntry
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Ödeme Tutarı</Text>
          <View style={styles.amountContainer}>
            <TextInput
              placeholder="0.00"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={[styles.input, styles.amountInput]}
              placeholderTextColor="#999"
            />
            <Text style={styles.currency}>TL</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.payButton, isProcessing && styles.payButtonDisabled]} 
          onPress={handlePayment}
          disabled={isProcessing}
        >
          <Text style={styles.payButtonText}>
            {isProcessing ? 'İşleniyor...' : 'Ödemeyi Tamamla'}
          </Text>
        </TouchableOpacity>

        <View style={styles.securityInfo}>
          <Image source={require('../assets/flat-icons/lock.png')} style={styles.lockIcon} />
          <Text style={styles.securityText}>Güvenli ödeme</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f7fa',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 15,
  },
  cardHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  cardLogos: {
    flexDirection: 'row',
  },
  cardLogo: {
    width: 40,
    height: 25,
    marginLeft: 10,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#fafafa',
    color: '#333',
  },
  smallInput: {
    padding: 12,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expirySeparator: {
    fontSize: 20,
    marginHorizontal: 5,
    color: '#666',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountInput: {
    flex: 1,
  },
  currency: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  payButton: {
    borderRadius: 10,
    backgroundColor: '#667eea',
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  payButtonDisabled: {
    opacity: 0.7,
    backgroundColor: '#a0aec0',
  },
  securityInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  lockIcon: {
    width: 14,
    height: 14,
    marginRight: 5,
    tintColor: '#666',
  },
  securityText: {
    fontSize: 12,
    color: '#666',
  },
});

export default MokaPayment;