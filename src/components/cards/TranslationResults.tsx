import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
interface TranslationResultsProps {
  results: string;
}
const TranslationResults: FC<TranslationResultsProps> = ({results}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{results}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    minHeight: 100,
    backgroundColor: '#343a40',
    marginTop: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
export default TranslationResults;
