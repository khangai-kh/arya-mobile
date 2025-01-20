import { LightBoxProvider } from '@alantoa/lightbox';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { App as MainApp } from './navigation/App';
import { theme } from './theme';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/configureStore';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PersistGate } from 'redux-persist/integration/react';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{ flex: 1 }}>
              <SafeAreaProvider>
                <PaperProvider theme={theme}>
                  <LightBoxProvider>
                    <NavigationContainer theme={theme}>
                      <MainApp />
                    </NavigationContainer>
                  </LightBoxProvider>
                </PaperProvider>
              </SafeAreaProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
