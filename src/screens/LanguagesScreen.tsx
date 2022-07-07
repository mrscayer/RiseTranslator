import {useNavigation, useRoute} from '@react-navigation/native';
import {
  StackNavigationProp,
  useGestureHandlerRef,
} from '@react-navigation/stack';
import React, {FC, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import LanguageItem from '../components/languageList/LanguageItem';
import {languageData} from '../data/languageData';
import {RootRouteProps, RootStackParamList} from '../models/RootStackParamList';

const LanguagesScreen: FC = () => {
  const route = useRoute<RootRouteProps<'LanguagesScreen'>>();
  const {target, type} = route?.params;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const ref = useGestureHandlerRef();
  const [isScrolledTop, setIsScrolledTop] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Translate from</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerText}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>All Languages</Text>
      </View>
      <FlatList
        waitFor={isScrolledTop ? ref : undefined}
        onScroll={({nativeEvent}) => {
          const scrolledTop = nativeEvent.contentOffset.y <= 0;
          setIsScrolledTop(scrolledTop);
        }}
        data={languageData}
        extraData={target}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('HomeScreen', {newTarget: item, type: type})
              }>
              <LanguageItem
                item={item}
                isSelected={target?.name === item.name}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    paddingVertical: 8,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 22,
  },
  listHeader: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
  },
  listHeaderText: {
    color: 'gray',
    fontSize: 16,
  },
});
export default LanguagesScreen;
