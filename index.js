/**
 * @format
 */

import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import { name as appName } from './app.json';
import { default as App } from './src/App';

AppRegistry.registerComponent(appName, () => App);
