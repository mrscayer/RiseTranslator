import React, {FC} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

interface Props {
  onPress: () => void;
  isFavorite: boolean;
}

const FavoriteButton: FC<Props> = ({onPress, isFavorite}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={require('@constants/files/star.png')}
        style={[styles.star, !isFavorite ? {tintColor: 'gray'} : {}]}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  star: {
    width: 25,
    height: 25,
  },
});

export default FavoriteButton;
