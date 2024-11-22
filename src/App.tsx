import { LinkingOptions } from '@react-navigation/native';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { App as Main } from './navigation/App';
import { BottomTabStackParams } from './navigation/BottomTab';
import { theme } from './theme';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const linking: LinkingOptions<BottomTabStackParams> = {
  prefixes: ['arya://'],
  config: {
    initialRouteName: 'Home',
    screens: {

    }
  },
};

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <Main />
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
