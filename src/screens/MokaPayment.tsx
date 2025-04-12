import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  MokaPayment: { 
    pricingPlanId: number;
    eventId?: number;
  };
  ThreeDSecureScreen: { redirectUrl: string; orderId: number };
  PaymentResultScreen: { 
    isSuccessful: boolean;
    resultCode: string;
    resultMessage: string;
    trxCode: string;
  };
};

type MokaPaymentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MokaPayment'>;
type MokaPaymentScreenRouteProp = RouteProp<RootStackParamList, 'MokaPayment'>;

type Props = {
  navigation: MokaPaymentScreenNavigationProp;
  route: MokaPaymentScreenRouteProp;
};

const MokaPayment: React.FC<Props> = ({ navigation, route }) => {
  const { pricingPlanId, eventId } = route.params;
  const [cardHolderFullName, setCardHolderFullName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvcNumber, setCvcNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<{
    amount: number;
    currency: string;
    description: string;
  } | null | undefined>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        let details;
        
        if (pricingPlanId) {
          const response = await axios.get(`https://dev.aryawomen.com/api/pricing_plan/${pricingPlanId}`);
          details = {
            amount: response.data.price,
            currency: response.data.currency,
            description: response.data.description
          };
        } else if (eventId) {
          const response = await axios.get(`https://dev.aryawomen.com/api/events/${eventId}`);
          if (!response.data.is_paid) {
            throw new Error('This event is free');
          }
          details = {
            amount: response.data.price,
            currency: 'TL',
            description: response.data.event_sub_title || 'Etkinlik Katılımı'
          };
        }
        
        setPaymentDetails(details);
      } catch (error) {
        Alert.alert('Hata', 'Ödeme bilgileri alınamadı');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [pricingPlanId, eventId]);

  const handlePayment = async () => {
    if (!validateForm() || !paymentDetails) return;
    setIsProcessing(true);

    try {
      const response = await axios.post('https://dev.aryawomen.com/api/mokapos/payment/3d', {
        CardHolderFullName: cardHolderFullName,
        CardNumber: cardNumber,
        ExpMonth: expMonth,
        ExpYear: `20${expYear}`,
        CvcNumber: cvcNumber,
        Currency: 'TL',
        InstallmentNumber: 1,
        VirtualPosOrderId: `order-${Date.now()}`,
        VoidRefundReason: 0,
        ClientIP: '192.168.1.1',
        RedirectUrl: 'https://dev.aryawomen.com/api/moka-pos/payment-result',
        UtilityCompanyBillId: 0,
        DealerStaffId: 0,
        pricing_plan_id: pricingPlanId || undefined,
        event_id: eventId || undefined
      });

      if (response.data.redirectUrl && response.data.order_id) {
        navigation.navigate('ThreeDSecureScreen', { 
          redirectUrl: response.data.redirectUrl,
          orderId: response.data.order_id
        });
      } else {
        throw new Error('Invalid response from payment gateway');
      }

    } catch (error: any) {
      console.error("Payment error", error.response?.data || error.message);
      Alert.alert(
        'Ödeme Hatası', 
        error.response?.data?.message || 'Ödeme başlatılırken bir hata oluştu. Lütfen bilgilerinizi kontrol edip tekrar deneyin.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const validateForm = () => {
    if (!cardHolderFullName || !cardNumber || !expMonth || !expYear || !cvcNumber) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return false;
    }

    const cardNumberCleaned = cardNumber.replace(/\s/g, '');
    if (!/^[0-9]{16}$/.test(cardNumberCleaned)) {
      Alert.alert('Hata', 'Geçerli bir 16 haneli kart numarası girin.');
      return false;
    }

    if (expMonth.length !== 2 || parseInt(expMonth) < 1 || parseInt(expMonth) > 12) {
      Alert.alert('Hata', 'Son kullanma ayı 01 ile 12 arasında olmalıdır.');
      return false;
    }

    if (expYear.length !== 2) {
      Alert.alert('Hata', 'Son kullanma yılı 2 haneli olmalıdır (ör: 25).');
      return false;
    }

    if (!/^\d{3}$/.test(cvcNumber)) {
      Alert.alert('Hata', 'CVC numarası 3 haneli olmalıdır.');
      return false;
    }

    return true;
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.substring(0, 19);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#667eea" />
      </View>
    );
  }

  if (!paymentDetails) {
    return (
      <View style={styles.container}>
        <Text>Ödeme bilgileri yüklenemedi</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerText}>ÖDEME İŞLEMİ</Text>
          <Text style={styles.descriptionText}>{paymentDetails.description}</Text>
          <Text style={styles.amountText}>{paymentDetails.amount} {paymentDetails.currency}</Text>
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

        <TouchableOpacity 
          style={[styles.payButton, isProcessing && styles.payButtonDisabled]} 
          onPress={handlePayment}
          disabled={isProcessing}
        >
          <Text style={styles.payButtonText}>
            {isProcessing ? 'İşleniyor...' : 'ÖDEME YAP'}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
  },
  amountText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#667eea',
    marginTop: 10,
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