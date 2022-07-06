import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface TranslationProps {
  setSearchText: (val: string) => void;
  translate: (val: string, recognizingStatus: boolean) => void;
  searchText: string;
  _startRecognizing: () => void;
  _stopRecognizing: () => void;
}

const Translation: FC<TranslationProps> = ({
  setSearchText,
  translate,
  searchText,
  _startRecognizing,
  _stopRecognizing,
}) => {
  return (
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
  );
};
const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#343a40',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
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
export default Translation;
