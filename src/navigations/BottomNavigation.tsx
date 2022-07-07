import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavoritesScreen from '../screens/FavoritesScreen';
import HomeScreen from '../screens/HomeScreen';
import {Image} from 'react-native';

const Tab = createBottomTabNavigator();
const BottomNavigation: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: '#495057', borderTopWidth: 0},
        tabBarActiveTintColor: '#ffb229',
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        initialParams={{newData: {}, type: ''}}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Image
              source={require('../constants/files/home.png')}
              style={{width: 25, height: 25, tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({color}) => (
            <Image
              source={require('../constants/files/star.png')}
              style={{width: 25, height: 25, tintColor: color}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
