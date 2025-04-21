import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { LightBoxProvider } from '@alantoa/lightbox';
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { Navigation } from './navigation';
import { theme as paperTheme } from './theme';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/configureStore';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PersistGate } from 'redux-persist/integration/react';
import { NoInternet } from './components/NoInternet';
import { NavigationProvider } from './contexts/NavigationContext';
import RNBootSplash from 'react-native-bootsplash';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const init = async () => {
      // Simulate loading time (optional)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Hide splash screen
      await RNBootSplash.hide({ fade: true });
    };

    init();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <PaperProvider theme={paperTheme}>
              <LightBoxProvider>
                <NavigationProvider>
                  <NavigationContainer theme={NavigationDefaultTheme}>
                    <Navigation />
                    <NoInternet />
                  </NavigationContainer>
                </NavigationProvider>
              </LightBoxProvider>
            </PaperProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
