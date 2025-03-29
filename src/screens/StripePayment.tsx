import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useStripe, StripeProvider } from '@stripe/stripe-react-native'; // StripeProvider eklendi

const STRIPE_API_URL = 'https://dev.aryawomen.com/api/stripe/create-payment-intent';

const StripePayment = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPaymentIntent();
  }, []);

  const fetchPaymentIntent = async () => {
    try {
      const response = await fetch(STRIPE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 1000, currency: 'usd' }),
      });

      const data = await response.json();
      console.log('Sunucu Yanıtı:', data); // Debug için log ekledik
      
      if (!response.ok) throw new Error(data.error || 'Payment intent oluşturulamadı');
      
      if (data.client_secret) {
        setClientSecret(data.client_secret);
        await initializePaymentSheet(data.client_secret);
      } else {
        throw new Error('Client secret alınamadı');
      }
    } catch (error: any) {
      Alert.alert('Hata', error.message); // Gerçek hata mesajını göster
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const initializePaymentSheet = async (clientSecret: string) => {
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'Arya Women',
      returnURL: 'yourapp://stripe-redirect', // iOS için gerekli
    });

    if (error) {
      throw error; // Hata yukarı fırlatılıyor
    }
  };

  const handlePayment = async () => {
    if (!clientSecret) return;
    
    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert('Ödeme Başarısız', error.message);
    } else {
      Alert.alert('Ödeme Başarılı', 'Ödemeniz başarıyla alındı! 🎉');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" />
      ) : (
        <Button mode="contained" onPress={handlePayment} disabled={!clientSecret}>
          Ödeme Yap
        </Button>
      )}
    </View>
  );
};

// Uygulama giriş noktanızda bu şekilde sarmalamanız gerekiyor
export default () => (
  <StripeProvider
    publishableKey="pk_test_51Qp5QPGhxaN2Gp6ktuu8gFk3HZNBYCYkmeVjJGivpCcC1EkXtOsK178TJWBCRVXdTGZma2jUQw9rDKdyhS9MMJXu00rKWDbAdc" // Stripe dashboard'dan alınan test key
    urlScheme="yourapp://stripe-redirect" // iOS için gerekli
    merchantIdentifier="merchant.com.yourapp" // iOS için gerekiyorsa
  >
    <StripePayment />
  </StripeProvider>
);