import React from 'react';
import { LightBoxProvider } from '@alantoa/lightbox';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { Navigation } from './navigation';
import { theme as paperTheme } from './theme';
import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/configureStore';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PersistGate } from 'redux-persist/integration/react';
import { NoInternet } from './components/NoInternet';

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
              <PaperProvider theme={paperTheme}>
                <LightBoxProvider>
                  <NavigationContainer theme={NavigationDefaultTheme}>
                      <Navigation />
                      <NoInternet />
                  </NavigationContainer>
                </LightBoxProvider>
              </PaperProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};




export default App;
