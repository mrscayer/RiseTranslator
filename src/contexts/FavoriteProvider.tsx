import React, {useContext, createContext, useState, useEffect, FC} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ContextState {
  favorites: any;
  addFavorite: (item: any) => void;
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
        data?.translateText === item?.translateText,
    );

    if (findIntex === -1) {
      let newData = [...favorites];
      newData.push(item);
      setFavorites(newData);
    } else {
      let filteredData = favorites.filter((data, index) => {
        return index !== findIntex;
      });
      setFavorites(filteredData);
    }
  };

  useEffect(() => {
    AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoriteContext.Provider value={{favorites, addFavorite}}>
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteContextProvider;
