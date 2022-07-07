import React, {FC} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import FavoriteCard from '@components/cards/FavoriteCard';
import Header from '@components/Header';
import {useFavorite} from '@contexts/FavoriteProvider';

const FavoritesScreen: FC = () => {
  const {favorites} = useFavorite();
  return (
    <View style={styles.container}>
      <Header boldTitle="Rise" title="Translator" />
      <FlatList
        contentContainerStyle={{flex: 1}}
        data={favorites}
        renderItem={({item}) => {
          return <FavoriteCard item={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  star: {
    width: 25,
    height: 25,
  },
});
export default FavoritesScreen;
