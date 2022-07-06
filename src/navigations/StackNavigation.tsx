import {createStackNavigator} from '@react-navigation/stack';
import React, {FC} from 'react';
import HomeScreen from '../screens/HomeScreen';
import LanguagesScreen from '../screens/LanguagesScreen';
const Stack = createStackNavigator();
const StackNavigation: FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={LanguagesScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
