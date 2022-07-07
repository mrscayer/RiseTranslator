import React, {FC, useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {useFavorite} from '../../contexts/FavoriteProvider';
const width = Dimensions.get('screen').width;
interface FavoriteCardProps {
  item: any;
}
const FavoriteCard: FC<FavoriteCardProps> = ({item}) => {
  const [isFavorite, setFavorite] = useState<boolean>(false);
  const {favorites, addFavorite} = useFavorite();
  const AddOrRemoveFavorite = () => {
    addFavorite(item);
  };

  useEffect(() => {
    setFavorite(
      favorites.some(
        data =>
          data?.sourceText === item?.sourceText &&
          data?.translateText === item?.translateText &&
          data?.sourceCode === item?.sourceCode &&
          data?.targetCode === item?.targetCode,
      ),
    );
  }, [item, favorites]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.sourceText}>
          <Text style={styles.bold}>{item?.sourceCode}</Text>: {item.sourceText}
        </Text>
        <Text style={styles.targetText}>
          <Text style={styles.bold}>{item?.targetCode}</Text>:{' '}
          {item.translateText}
        </Text>
      </View>
      <TouchableOpacity onPress={AddOrRemoveFavorite}>
        <Image
          source={require('../../constants/files/star.png')}
          style={[styles.star, !isFavorite ? {tintColor: 'gray'} : {}]}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  star: {
    width: 25,
    height: 25,
  },
  container: {
    width: width - 30,
    padding: 10,
    borderWidth: 0.3,
    borderColor: 'white',
    marginTop: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  sourceText: {
    color: 'white',
  },
  targetText: {
    color: 'white',
    marginTop: 5,
  },
  bold: {
    fontWeight: '600',
  },
  textContainer: {
    width: width - 75,
  },
});
export default FavoriteCard;
