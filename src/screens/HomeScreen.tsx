import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import {RootRouteProps, RootStackParamList} from '../models/RootStackParamList';
import {translateText} from '../utils/translations';
import Voice, {SpeechResultsEvent} from '@react-native-voice/voice';
import {languageData} from '../data/languageData';

const HomeScreen: FC = () => {
  const [results, setResults] = useState<string>('');
  const [source, setSource] = useState<any>(languageData[0]);
  const [target, setTarget] = useState<any>(languageData[1]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [searchText, setSearchText] = useState<string>('');
  const route = useRoute<RootRouteProps<'HomeScreen'>>();
  const {newTarget, type} = route?.params;

  useEffect(() => {
    if (type === 'source') {
      setSource(newTarget);
    } else if (type === 'target') {
      setTarget(newTarget);
    }
  }, [newTarget, type]);
  useEffect(() => {
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    const searchValue: string =
      typeof e?.value?.[0] === 'string' ? e?.value?.[0] : '';
    setSearchText(searchValue);
    translate(searchValue, true);
  };

  const _startRecognizing = async () => {
    try {
      await Voice.start(source.voiceCode);
      setSearchText('');
    } catch (e) {
      console.error(e);
    }
  };

  const _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  let typingTimer: any = null;

  const translate = (val: string, recognizingStatus: boolean) => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(async () => {
      if (val) {
        if (recognizingStatus) {
          _stopRecognizing();
        }
        const res = await translateText(val, source.code, target.code);
        setResults(res);
      } else {
        setResults('');
      }
    }, 500);
  };
  const replaceLanguage = async () => {
    setTarget(source);
    setSource(target);
    setSearchText(results);
    const res = await translateText(results, target.code, source.code);
    setResults(res);
  };

  return (
    <View style={styles.container}>
      <Header boldTitle="Rise" title="Translator" />
      <View style={styles.selectLanguageContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('LanguagesScreen', {
              target: source,
              type: 'source',
            })
          }>
          <Text style={styles.languageTitle}>{source.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => replaceLanguage()}>
          <Text style={styles.languageTitle}>{'<>'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('LanguagesScreen', {
              target: target,
              type: 'target',
            })
          }>
          <Text style={styles.languageTitle}>{target.name}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <View style={styles.row}>
          <TextInput
            onChangeText={val => {
              setSearchText(val);
              translate(val, false);
            }}
            autoCapitalize={'none'}
            placeholder="type anything"
            style={styles.input}
            placeholderTextColor="rgba(255,255,255,0.8)"
            multiline
            value={searchText}
          />
          <View>
            <TouchableOpacity onPress={() => _startRecognizing()}>
              <Text>X</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => _stopRecognizing()}>
              <Text>S</Text>
            </TouchableOpacity>
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
