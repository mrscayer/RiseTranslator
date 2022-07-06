import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import {RootStackParamList} from '../models/RootStackParamList';
import {translateText} from '../utils/translations';

const HomeScreen: FC = () => {
  const [results, setResults] = useState<string>('');
  const [source, setSource] = useState<string>('en');
  const [target, setTarget] = useState<string>('tr');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  let typingTimer: any = null;

  const translate = (val: string) => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(async () => {
      if (val) {
        const res = await translateText(val, source, target);
        setResults(res);
        console.log('çalıştı');
      } else {
        setResults('');
      }
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Header boldTitle="Rise" title="Translator" />
      <View style={styles.selectLanguageContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('LanguagesScreen')}>
          <Text style={styles.languageTitle}>English</Text>
        </TouchableOpacity>
        <Text style={styles.languageTitle}>{'<>'}</Text>
        <Text style={styles.languageTitle}>Turkish</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.row}>
          <TextInput
            onChangeText={val => translate(val)}
            autoCapitalize={'none'}
            placeholder="type anything"
            style={styles.input}
            placeholderTextColor="rgba(255,255,255,0.8)"
            multiline
          />
          <View>
            <Text>X</Text>
            <Text>S</Text>
          </View>
        </View>
      </View>

      <Text>{results}</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectLanguageContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    backgroundColor: '#343a40',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomColor: 'white',
    borderBottomWidth: 0.4,
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#343a40',
  },
  input: {
    width: '90%',
    height: 100,
    paddingLeft: 8,
    color: 'white',
    padding: 0,
  },
  languageTitle: {
    color: 'white',
  },
  row: {
    flexDirection: 'row',
  },
});
