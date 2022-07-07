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
  recordStatus: boolean;
}

const Translation: FC<TranslationProps> = ({
  setSearchText,
  translate,
  searchText,
  _startRecognizing,
  _stopRecognizing,
  recordStatus,
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
          {searchText !== '' && (
            <TouchableOpacity
              onPress={() => {
                translate('', false);
                setSearchText('');
              }}>
              <Text style={styles.clear}>X</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          recordStatus ? _stopRecognizing() : _startRecognizing()
        }>
        <View style={styles.record}>
          <Text style={styles.recordText}>
            {recordStatus ? 'Stop' : 'Start'} Record
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
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
  clear: {
    fontSize: 20,
    color: 'white',
    padding: 5,
  },
  record: {
    flexDirection: 'row',
    width: 100,
    height: 40,
    borderColor: 'white',
    borderWidth: 0.4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  recordText: {
    color: 'white',
  },
});
export default Translation;
