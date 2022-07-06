import React, {FC} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '../models/RootStackParamList';

const HomeScreen: FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('LanguagesScreen')}>
        <View style={{width: 250, height: 50, backgroundColor: 'black'}} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
