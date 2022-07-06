import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
interface LanguageItemProps {
  item: any;
  isSelected: boolean;
}
const LanguageItem: FC<LanguageItemProps> = ({item, isSelected}) => {
  return (
    <View style={styles.container}>
      <View style={styles.selectedContainer}>
        {isSelected && <Text style={styles.tick}>{'\u2713'}</Text>}
      </View>
      <Text style={styles.title}>{item.name}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 17,
  },
  selectedContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tick: {color: 'white', fontSize: 17},
});
export default LanguageItem;
