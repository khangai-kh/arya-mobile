import React, { useRef, useState } from 'react';
import { View, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  ThreeDSecureScreen: { redirectUrl: string };
  MokaPayment: undefined; // Ödeme sayfası route'u
  Home: undefined;
};

type ThreeDSecureScreenProps = {
  route: RouteProp<RootStackParamList, 'ThreeDSecureScreen'>;
  navigation: StackNavigationProp<RootStackParamList>;
};

const ThreeDSecureScreen: React.FC<ThreeDSecureScreenProps> = ({ route, navigation }) => {
  const { redirectUrl } = route.params;
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);

  const getErrorMessage = (error: any) => {
    const errorMap: Record<string, string> = {
      'PaymentDealer.CheckDealerPaymentLimits.DailyDealerLimitExceeded': 
        'Günlük ödeme limitiniz dolmuş. Lütfen yarın tekrar deneyiniz.',
      'PaymentDealer.InvalidCardInfo': 
        'Geçersiz kart bilgileri. Lütfen kontrol edip tekrar deneyiniz.',
      'PaymentDealer.InsufficientFunds': 
        'Hesabınızda yeterli bakiye bulunmamaktadır.',
      'SYSTEM_ERROR': 
        'Sistem hatası oluştu. Lütfen daha sonra tekrar deneyiniz.'
    };

    return errorMap[error.resultCode] || 
           error.resultMessage || 
           error.message || 
           'Ödeme işlemi sırasında bir hata oluştu';
  };

  const handlePaymentError = (error: any) => {
    console.log('Full error details:', JSON.stringify(error, null, 2));
    const errorMessage = getErrorMessage(error);
    
    Alert.alert(
      'Ödeme Hatası',
      errorMessage,
      [
        { 
          text: 'Ödeme Sayfasına Dön', 
          onPress: () => navigation.navigate('MokaPayment') // Ödeme sayfasına geri dön
        },
        { 
          text: 'Ana Sayfa', 
          onPress: () => navigation.navigate('Home'),
          style: 'cancel'
        }
      ]
    );
  };

  const handleNavigationChange = (navState: WebViewNavigation) => {
    const { url } = navState;
    console.log('Current URL:', url);

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
  };

  const handleMessage = (event: { nativeEvent: { data: string } }) => {
    try {
      const response = JSON.parse(event.nativeEvent.data);
      
      if (response.error) {
        throw new Error(response.error);
      }

      const content = response.body;
      console.log('Page content:', content);

      try {
        const data = JSON.parse(content);
        if (data.isSuccessful === true || data.isSuccessful === 'true') {
          Alert.alert(
            '✅ Ödeme Başarılı',
            `İşlem Numaranız: ${data.trxCode || 'Bilinmiyor'}`,
            [{ text: 'Tamam', onPress: () => navigation.navigate('Home') }]
          );
        } else {
          handlePaymentError(data);
        }
      } catch (e) {
        if (content.includes('isSuccessful":true') || content.includes('isSuccessful":"true')) {
          const trxCodeMatch = content.match(/"trxCode":"([^"]+)"/);
          Alert.alert(
            '✅ Ödeme Başarılı',
            `İşlem Numaranız: ${trxCodeMatch ? trxCodeMatch[1] : 'Bilinmiyor'}`,
            [{ text: 'Tamam', onPress: () => navigation.navigate('Home') }]
          );
        } else if (content.includes('error') || content.includes('fail')) {
          handlePaymentError({ resultMessage: 'Ödeme işlemi başarısız oldu' });
        }
      }
    } catch (e) {
      console.log('Error parsing response:', e);
      handlePaymentError({ 
        resultCode: 'PARSE_ERROR', 
        resultMessage: 'Ödeme sonucu işlenirken hata oluştu' 
      });
    }
  };

  return (
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
            resultMessage: 'Ödeme sayfası yüklenemedi'
          });
        }}
        onHttpError={(syntheticEvent) => {
          console.error('HTTP error:', syntheticEvent.nativeEvent);
          handlePaymentError({
            resultCode: `HTTP_${syntheticEvent.nativeEvent.statusCode}`,
            resultMessage: 'Teknik bir hata oluştu'
          });
        }}
      />

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)'
  }
});

export default ThreeDSecureScreen;