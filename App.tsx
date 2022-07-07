import React, {FC} from 'react';
import {LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import FavoriteContextProvider from './src/contexts/FavoriteProvider';
import Route from './src/Route';
LogBox.ignoreAllLogs();
const App: FC = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <FavoriteContextProvider>
          <Route />
        </FavoriteContextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
