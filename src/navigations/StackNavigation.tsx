import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React, {FC} from 'react';
import LanguagesScreen from '../screens/LanguagesScreen';
import BottomNavigation from './BottomNavigation';
const Stack = createStackNavigator();
const StackNavigation: FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={BottomNavigation} />
      <Stack.Screen
        name="LanguagesScreen"
        component={LanguagesScreen}
        options={{
          ...TransitionPresets.ModalPresentationIOS,
          gestureEnabled: true,
          gestureResponseDistance: 800,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
