import React, {useContext, createContext, useState, useEffect, FC} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoriteType {
  sourceText: string;
  translateText: string;
  targetCode: string;
  sourceCode: string;
}
interface ContextState {
  favorites: Array<FavoriteType>;
  addFavorite: (item: FavoriteType) => void;
}

const FavoriteContext = createContext<ContextState>({
  favorites: [],
  addFavorite: () => {},
});

export const useFavorite = () => useContext(FavoriteContext);

interface Props {
  children?: JSX.Element | JSX.Element[];
}

const FavoriteContextProvider: FC<Props> = ({children}) => {
  const [favorites, setFavorites] = useState<
    Array<{
      sourceText: '';
      translateText: '';
      targetCode: '';
      sourceCode: '';
    }>
  >([]);

  useEffect(() => {
    AsyncStorage.getItem('favorites').then(value => {
      if (value) {
        setFavorites(JSON.parse(value));
      }
    });
  }, []);

  const addFavorite = (item: any) => {
    const findIntex: number = favorites.findIndex(
      data =>
        data?.sourceText === item?.sourceText &&
        data?.translateText === item?.translateText &&
        data?.sourceCode === item?.sourceCode &&
        data?.targetCode === item?.targetCode,
    );

    if (findIntex === -1) {
      let newData = [...favorites];
      newData.unshift(item);
      setFavorites(newData);
    } else {
      let filteredData = favorites.filter((data, index) => {
        return index !== findIntex;
      });
      setFavorites(filteredData);
    }
  };

  useEffect(() => {
    console.log(favorites);

    AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoriteContext.Provider value={{favorites, addFavorite}}>
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteContextProvider;
