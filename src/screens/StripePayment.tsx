import React, { useCallback, useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useStripe, StripeProvider } from '@stripe/stripe-react-native';

const STRIPE_API_URL = 'https://dev.aryawomen.com/api/stripe/create-payment-intent';

const StripePayment = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [autoPaymentTriggered, setAutoPaymentTriggered] = useState(false);

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
      console.log('Sunucu Yanıtı:', data);

      if (!response.ok) {throw new Error(data.error || 'Payment intent oluşturulamadı');}

      if (data.client_secret) {
        setClientSecret(data.client_secret);
        await initializePaymentSheet(data.client_secret);
      } else {
        throw new Error('Client secret alınamadı');
      }
    } catch (error: any) {
      Alert.alert('Hata', error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const initializePaymentSheet = async (paymentIntentSecret: string) => {
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: paymentIntentSecret,
      merchantDisplayName: 'Arya Women',
      returnURL: 'yourapp://stripe-redirect', // iOS için gerekli
    });

    if (error) {
      throw error;
    }
  };

  const handlePayment = useCallback(async () => {
    if (!clientSecret) {
      return;
    }

    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert('Ödeme Başarısız', error.message);
    } else {
      Alert.alert('Ödeme Başarılı', 'Ödemeniz başarıyla alındı! 🎉');
    }
  }, [clientSecret, presentPaymentSheet]);

  useEffect(() => {
    if (!loading && clientSecret && !autoPaymentTriggered) {
      setAutoPaymentTriggered(true);
      handlePayment();
    }
  }, [loading, clientSecret, autoPaymentTriggered, handlePayment]);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#6200ee" />}
    </View>
  );
};

export default () => (
  <StripeProvider
    publishableKey="pk_test_51Qp5QPGhxaN2Gp6ktuu8gFk3HZNBYCYkmeVjJGivpCcC1EkXtOsK178TJWBCRVXdTGZma2jUQw9rDKdyhS9MMJXu00rKWDbAdc"
    urlScheme="yourapp://stripe-redirect"
    merchantIdentifier="merchant.com.yourapp"
  >
    <StripePayment />
  </StripeProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
