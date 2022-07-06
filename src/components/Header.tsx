import React, {FC} from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
interface HeaderProps {
  boldTitle: string;
  title: string;
}
const Header: FC<HeaderProps> = ({boldTitle, title}) => {
  return (
    <SafeAreaView edges={['top']} style={styles.header}>
      <Text style={styles.boldTitle}>
        {boldTitle} <Text style={styles.title}>{title}</Text>
      </Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 80,
    width: '100%',
    backgroundColor: '#495057',
    alignItems: 'center',
    justifyContent: 'center',
  },

  boldTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: '700',
  },
  title: {
    fontWeight: '400',
  },
});
export default Header;
