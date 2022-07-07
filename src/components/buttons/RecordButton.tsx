import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  onPress: () => void;
  text: string;
}
const RecordButton: FC<Props> = ({onPress, text}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.record}>
        <Text style={styles.recordText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
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
export default RecordButton;
