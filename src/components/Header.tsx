import React, {FC} from 'react';
import {Platform, StyleSheet, Text} from 'react-native';
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
    width: '100%',
    backgroundColor: '#495057',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
    paddingTop: Platform.OS === 'android' ? 8 : 0,
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
