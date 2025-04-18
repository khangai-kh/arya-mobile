import React, { useCallback, useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useStripe, StripeProvider } from '@stripe/stripe-react-native';

const STRIPE_API_URL = 'https://dev.aryawomen.com/api/stripe/create-payment-intent';

export const StripePayment = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [autoPaymentTriggered, setAutoPaymentTriggered] = useState<boolean>(false);

  // Fetch payment intent from backend
  const fetchPaymentIntent = async () => {
    try {
      setLoading(true);
      const response = await fetch(STRIPE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 1000, currency: 'usd' }), // Amount in cents
      });

      const data = await response.json();
      console.log('Server Response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment intent');
      }

      if (data.client_secret) {
        setClientSecret(data.client_secret);
        await initializePaymentSheet(data.client_secret);
      } else {
        throw new Error('Client secret not received');
      }
    } catch (error: any) {
      console.error('Fetch Payment Intent Error:', error);
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Initialize payment sheet
  const initializePaymentSheet = async (paymentIntentSecret: string) => {
    try {
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: paymentIntentSecret,
        merchantDisplayName: 'Arya Women',
        returnURL: 'yourapp://stripe-redirect', // Required for iOS
        applePay: { merchantCountryCode: 'US' }, // Enable Apple Pay (optional)
        googlePay: { merchantCountryCode: 'US', testEnv: true }, // Enable Google Pay (optional)
      });

      if (error) {
        throw new Error(`Payment sheet initialization failed: ${error.message}`);
      }
    } catch (error: any) {
      console.error('Initialize Payment Sheet Error:', error);
      throw error;
    }
  };

  // Handle payment
  const handlePayment = useCallback(async () => {
    if (!clientSecret) {
      Alert.alert('Error', 'Payment configuration not ready');
      return;
    }

    try {
      const { error } = await presentPaymentSheet();
      if (error) {
        Alert.alert('Payment Failed', error.message);
      } else {
        Alert.alert('Payment Successful', 'Your payment was successful! 🎉');
      }
    } catch (error: any) {
      console.error('Handle Payment Error:', error);
      Alert.alert('Error', 'An unexpected error occurred during payment');
    }
  }, [clientSecret, presentPaymentSheet]);

  // Fetch payment intent on component mount
  useEffect(() => {
    fetchPaymentIntent();
  }, []);

  // Trigger payment automatically after payment sheet is initialized
  useEffect(() => {
    if (!loading && clientSecret && !autoPaymentTriggered) {
      setAutoPaymentTriggered(true);
      handlePayment();
    }
  }, [loading, clientSecret, autoPaymentTriggered, handlePayment]);

  return (
    <StripeProvider
      publishableKey="pk_test_51Qp5QPGhxaN2Gp6ktuu8gFk3HZNBYCYkmeVjJGivpCcC1EkXtOsK178TJWBCRVXdTGZma2jUQw9rDKdyhS9MMJXu00rKWDbAdc"
      urlScheme="yourapp://stripe-redirect" // Ensure this matches your app's URL scheme
      merchantIdentifier="merchant.com.yourapp" // Required for Apple Pay
    >
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" color="#6200ee" />}
      </View>
    </StripeProvider>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
