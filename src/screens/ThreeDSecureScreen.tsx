import React, { useRef, useState } from 'react';
import { View, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { API } from '../plugins/axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/configureStore';

type RootStackParamList = {
  ThreeDSecureScreen: { redirectUrl: string };
  MokaPayment: undefined;
  Home: undefined;
  PremiumSuccess: undefined; // Route for successful premium payment
};

type ThreeDSecureScreenProps = {
  route: RouteProp<RootStackParamList, 'ThreeDSecureScreen'>;
  navigation: StackNavigationProp<RootStackParamList>;
};

const ThreeDSecureScreen: React.FC<ThreeDSecureScreenProps> = ({ route, navigation }) => {
  const { redirectUrl } = route.params;
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state: RootState) => state.auth);
  const [ check, setCheck ] = useState(false);
  // Function to map error codes/messages to user-friendly messages.
  const getErrorMessage = (error: any) => {
    const errorMap: Record<string, string> = {
      'PaymentDealer.CheckDealerPaymentLimits.DailyDealerLimitExceeded':
        'Günlük ödeme limitiniz dolmuş. Lütfen yarın tekrar deneyiniz.',
      'PaymentDealer.InvalidCardInfo':
        'Geçersiz kart bilgileri. Lütfen kontrol edip tekrar deneyiniz.',
      'PaymentDealer.InsufficientFunds':
        'Hesabınızda yeterli bakiye bulunmamaktadır.',
      'SYSTEM_ERROR':
        'Sistem hatası oluştu. Lütfen daha sonra tekrar deneyiniz.',
    };

    return errorMap[error.resultCode] ||
           error.resultMessage ||
           error.message ||
           'Ödeme işlemi sırasında bir hata oluştu';
  };

  // Error handler which shows an Alert with options to retry or go back.
  const handlePaymentError = (error: any) => {
    console.log('Full error details:', JSON.stringify(error, null, 2));
    const errorMessage = getErrorMessage(error);
    Alert.alert(
      'Ödeme Hatası',
      errorMessage,
      [
        {
          text: 'Ödeme Sayfasına Dön',
          onPress: () => navigation.navigate('MokaPayment'),
        },
        {
          text: 'Ana Sayfa',
          onPress: () => navigation.navigate('Home'),
          style: 'cancel',
        },
      ]
    );
  };

  // Reusable function that sends a PUT request to update payment status.
  // It includes the Bearer token in the Authorization header.
  // Returns true if the update was successful (e.g., status code 200) and false otherwise.
  const updatePaymentStatus = async (orderNumber: string): Promise<boolean> => {
    console.log('Payload order:', orderNumber);
    const payload = JSON.stringify({
      order_number: orderNumber,
      pricingPlanId: 1,
    });
    try {
      const response = await API.put('api/payment/payment_status', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Check the response status or other success criteria.
      if (response && response.status === 200) {
        console.log('Payment status success:', response);
        return true;
      } else {
        console.log('Payment status update failed:', response);
        return false;
      }
    } catch (error) {
      console.log('Payment status update error:', error);
      return false;
    }
  };

  // Handles navigation changes in the WebView.
  const handleNavigationChange = (navState: WebViewNavigation) => {
    const { url } = navState;
    console.log('Current URL:', url);
    console.log('Check:', check);
   // if(!check){
      if (url.includes('/moka-pos/payment-result')) {
        webViewRef.current?.injectJavaScript(`
          try {
            const response = {
              body: document.body.innerText,
              title: document.title
            };
            window.ReactNativeWebView.postMessage(JSON.stringify(response));
          } catch(e) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              error: e.message
            }));
          }
          true;
        `);
      }
      setCheck(true);
    //}
  };

  // Handles the message received from the WebView after processing the payment.
  const handleMessage = async (event: { nativeEvent: { data: string } }) => {
    try {
      console.log('WebView message received:', event.nativeEvent.data);
      const response = JSON.parse(event.nativeEvent.data);
      if (response.error) {
        console.log('Error in response:', response.error);
        return;
      }
      const content = response.body;
      try {
        // Attempt to parse the content as JSON
        const data = JSON.parse(content);
        if (data.isSuccessful === true || data.isSuccessful === 'true') {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            textBody: 'Payment successful',
            autoClose: 2000,
          });
          // Determine the order number from the response data.
          const orderNumber = data.order_number || (data.trxCode ? data.trxCode : 'unknown');
          // Only navigate to PremiumSuccess if the PUT API call was successful.
          console.log('Order number:', orderNumber);
          const updateSuccess = await updatePaymentStatus(orderNumber);
          if (updateSuccess) {
            navigation.navigate('PremiumSuccess');
          } else {
            handlePaymentError({ resultMessage: 'Ödeme güncelleme işlemi başarısız oldu' });
          }
        } else {
          handlePaymentError(data);
        }
      } catch (e) {
        console.log('Error parsing JSON:', e);
      }
    } catch (e) {
      console.log('Error parsing response:', e);
      handlePaymentError({
        resultCode: 'PARSE_ERROR',
        resultMessage: 'Ödeme sonucu işlenirken hata oluştu',
      });
    }
  };

  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
        <WebView
          ref={webViewRef}
          source={{ uri: redirectUrl }}
          onNavigationStateChange={handleNavigationChange}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onMessage={handleMessage}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          mixedContentMode="always"
          onError={(syntheticEvent) => {
            console.error('WebView error:', syntheticEvent.nativeEvent);
            handlePaymentError({
              resultCode: 'WEBVIEW_ERROR',
              resultMessage: 'Ödeme sayfası yüklenemedi',
            });
          }}
          onHttpError={(syntheticEvent) => {
            console.error('HTTP error:', syntheticEvent.nativeEvent);
            handlePaymentError({
              resultCode: `HTTP_${syntheticEvent.nativeEvent.statusCode}`,
              resultMessage: 'Teknik bir hata oluştu',
            });
          }}
        />

        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </View>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});

export default ThreeDSecureScreen;
