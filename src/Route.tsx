import {NavigationContainer} from '@react-navigation/native';
import React, {FC} from 'react';
import {View} from 'react-native';
import StackNavigation from './navigations/StackNavigation';

const Route: FC = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default Route;
