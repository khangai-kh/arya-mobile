import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  ThreeDSecureScreen: { redirectUrl: string };
  PaymentResultScreen: { isSuccessful: string | null; resultCode: string | null; resultMessage: string | null; trxCode: string | null };
};

type Props = {
  route: RouteProp<RootStackParamList, 'ThreeDSecureScreen'>;
  navigation: StackNavigationProp<RootStackParamList, 'ThreeDSecureScreen'>;
};

const ThreeDSecureScreen: React.FC<Props> = ({ route, navigation }) => {
  const { redirectUrl } = route.params;

  const handleNavigationChange = (navState: any) => {
    const { url } = navState;

    if (url.includes('/PayResult')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      const isSuccessful = urlParams.get('isSuccessful');
      const resultCode = urlParams.get('resultCode');
      const resultMessage = urlParams.get('resultMessage');
      const trxCode = urlParams.get('trxCode');

      navigation.replace('PaymentResultScreen', {
        isSuccessful,
        resultCode,
        resultMessage,
        trxCode
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: redirectUrl }}
        onNavigationStateChange={handleNavigationChange}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator size="large" />}
      />
    </View>
  );
};

export default ThreeDSecureScreen;
