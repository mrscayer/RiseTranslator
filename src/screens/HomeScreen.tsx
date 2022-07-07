import {useRoute} from '@react-navigation/native';
import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import {RootRouteProps} from '../models/RootStackParamList';
import {translateText} from '../utils/translations';
import Voice, {SpeechResultsEvent} from '@react-native-voice/voice';
import {languageData} from '../data/languageData';
import TranslationResults from '../components/cards/TranslationResults';
import Translation from '../components/cards/Translation';
import SelectLanguage from '../components/cards/SelectLanguage';
import {useFavorite} from '../contexts/FavoriteProvider';

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
  const [recordStatus, setRecordStatus] = useState<boolean>(false);
  const {favorites, addFavorite} = useFavorite();

  useEffect(() => {
    setSource(languageData[0]);
    setTarget(languageData[1]);
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
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [target, source]);

  const onSpeechResults = (e: SpeechResultsEvent) => {
    const searchValue: string =
      typeof e?.value?.[0] === 'string' ? e?.value?.[0] : '';
    setSearchText(searchValue);
    translate(searchValue, true, source?.code, target?.code);
  };

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    const searchValue: string =
      typeof e?.value?.[0] === 'string' ? e?.value?.[0] : '';
    setSearchText(searchValue);
  };

  const _startRecognizing = async () => {
    try {
      await Voice.start(source.voiceCode, {
        RECOGNIZER_ENGINE: 'services',
        EXTRA_PARTIAL_RESULTS: true,
        EXTRA_MAX_RESULTS: 30,
      });
      setRecordStatus(true);
      setSearchText('');
    } catch (e) {
      console.error(e);
    }
  };

  const _stopRecognizing = async () => {
    try {
      setRecordStatus(false);
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
    const countdownValue = Platform.OS === 'android' ? 2500 : 1000;
    const countdown = recognizingStatus ? countdownValue : 500;
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
    }, countdown);
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
      <ScrollView keyboardShouldPersistTaps="handled">
        <Translation
          setSearchText={setSearchText}
          searchText={searchText}
          translate={(val, recognitionStatus) =>
            translate(val, recognitionStatus, source?.code, target?.code)
          }
          _startRecognizing={_startRecognizing}
          _stopRecognizing={_stopRecognizing}
          recordStatus={recordStatus}
        />
        {results !== '' && (
          <TranslationResults
            results={results}
            searchText={searchText}
            targetCode={target?.code}
            sourceCode={source?.code}
          />
        )}
      </ScrollView>
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
