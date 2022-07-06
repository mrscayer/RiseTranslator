import {useRoute} from '@react-navigation/native';
import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import {RootRouteProps} from '../models/RootStackParamList';
import {translateText} from '../utils/translations';
import Voice, {SpeechResultsEvent} from '@react-native-voice/voice';
import {languageData} from '../data/languageData';
import TranslationResults from '../components/cards/TranslationResults';
import Translation from '../components/cards/Translation';
import SelectLanguage from '../components/cards/SelectLanguage';

const HomeScreen: FC = () => {
  const [results, setResults] = useState<string>('');
  const [source, setSource] = useState<{
    code: string;
    name: string;
    voiceCode: string;
  }>({code: '', name: '', voiceCode: ''});

  const [target, setTarget] = useState<{
    code: string;
    name: string;
    voiceCode: string;
  }>({code: '', name: '', voiceCode: ''});

  const [searchText, setSearchText] = useState<string>('');
  const route = useRoute<RootRouteProps<'HomeScreen'>>();
  const typingTimer = useRef<any>(null);

  useEffect(() => {
    setSource(languageData[0]);
    setTarget(languageData[0]);
  }, []);

  const {newTarget, type} = useMemo(() => {
    return route?.params;
  }, [route?.params]);

  useEffect(() => {
    if (type === 'source') {
      setSource(newTarget);
      translate(searchText, false, newTarget.code, target?.code);
    } else if (type === 'target') {
      setTarget(newTarget);
      translate(searchText, false, source.code, newTarget?.code);
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
    translate(searchValue, true, source?.code, target?.code);
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

  const translate = (
    val: string,
    recognizingStatus: boolean,
    sourceCode: string,
    targetCode: string,
  ) => {
    clearTimeout(typingTimer.current);

    typingTimer.current = setTimeout(async () => {
      if (val) {
        if (recognizingStatus) {
          _stopRecognizing();
        }
        const res = await translateText(val, sourceCode, targetCode);
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
    translate(results, false, target.code, source?.code);
  };

  return (
    <View style={styles.container}>
      <Header boldTitle="Rise" title="Translator" />
      <SelectLanguage
        source={source}
        target={target}
        replaceLanguage={replaceLanguage}
      />
      <Translation
        setSearchText={setSearchText}
        searchText={searchText}
        translate={(val, recognationStatus) =>
          translate(val, recognationStatus, source?.code, target?.code)
        }
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
});
