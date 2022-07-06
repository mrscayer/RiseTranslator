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
import TranslationResults from '../components/cards/TranslationResults';
import Translation from '../components/cards/Translation';

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
      <Translation
        setSearchText={setSearchText}
        searchText={searchText}
        translate={translate}
        _startRecognizing={_startRecognizing}
        _stopRecognizing={_stopRecognizing}
      />
      {results !== '' && <TranslationResults results={results} />}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
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
  languageTitle: {
    color: 'white',
  },
});
