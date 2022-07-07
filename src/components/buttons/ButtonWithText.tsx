import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';

interface Props {
  onPress: () => void;
  style: any;
  text: string;
}
const ButtonWithText: FC<Props> = ({onPress, style, text}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={style}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonWithText;
