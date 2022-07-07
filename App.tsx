import React, {FC} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import FavoriteContextProvider from './src/contexts/FavoriteProvider';
import Route from './src/Route';

const App: FC = () => {
  return (
    <SafeAreaProvider>
      <FavoriteContextProvider>
        <Route />
      </FavoriteContextProvider>
    </SafeAreaProvider>
  );
};

export default App;
