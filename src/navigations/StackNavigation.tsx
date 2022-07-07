import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React, {FC} from 'react';
import HomeScreen from '../screens/HomeScreen';
import LanguagesScreen from '../screens/LanguagesScreen';
const Stack = createStackNavigator();
const StackNavigation: FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        initialParams={{newData: {}, type: ''}}
      />
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
