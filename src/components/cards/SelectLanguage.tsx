import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '@models/RootStackParamList';
import ButtonWithText from '../buttons/ButtonWithText';
interface SelectLanguageProps {
  source: any;
  target: any;
  replaceLanguage: () => void;
}
const SelectLanguage: FC<SelectLanguageProps> = ({
  source,
  target,
  replaceLanguage,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.selectLanguageContainer}>
      <ButtonWithText
        onPress={() =>
          navigation.navigate('LanguagesScreen', {
            target: source,
            type: 'source',
          })
        }
        style={styles.languageTitle}
        text={source.name}
      />
      <TouchableOpacity onPress={() => replaceLanguage()}>
        <Image
          source={require('@constants/files/swap.png')}
          style={styles.swap}
        />
      </TouchableOpacity>
      <ButtonWithText
        onPress={() =>
          navigation.navigate('LanguagesScreen', {
            target: target,
            type: 'target',
          })
        }
        style={styles.languageTitle}
        text={target.name}
      />
    </View>
  );
};
const styles = StyleSheet.create({
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
  swap: {
    width: 25,
    height: 25,
    tintColor: 'white',
  },
});
export default SelectLanguage;
