/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { AuthProvider } from './src/context/AuthContext';
import { PaperProvider } from 'react-native-paper';

//AppRegistry.registerComponent(appName, () => App);

AppRegistry.registerComponent(appName, () => () => (

    <AuthProvider>
        <PaperProvider>
            <App></App>
        </PaperProvider>
    </AuthProvider>
    
), () => App );
