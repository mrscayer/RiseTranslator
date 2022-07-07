import React, {FC, useEffect, useMemo, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useFavorite} from '../../contexts/FavoriteProvider';
interface TranslationResultsProps {
  results: string;
  searchText: string;
  sourceCode: string;
  targetCode: string;
}
const TranslationResults: FC<TranslationResultsProps> = ({
  results,
  searchText,
  sourceCode,
  targetCode,
}) => {
  const {addFavorite, favorites} = useFavorite();
  const [isFavorite, setFavorite] = useState<boolean>(false);
  const item = useMemo(() => {
    return {
      sourceCode: sourceCode,
      targetCode: targetCode,
      sourceText: searchText,
      translateText: results,
    };
  }, [sourceCode, targetCode, searchText, results]);
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
  }, [results, favorites]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{results}</Text>
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
  container: {
    padding: 10,
    minHeight: 100,
    backgroundColor: '#343a40',
    marginTop: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    fontSize: 16,
    width: '90%',
  },
  star: {
    width: 25,
    height: 25,
  },
});
export default TranslationResults;
