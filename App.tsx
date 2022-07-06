import React, {FC} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Route from './src/Route';

const App: FC = () => {
  return (
    <SafeAreaProvider>
      <Route />
    </SafeAreaProvider>
  );
};

export default App;
