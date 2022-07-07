import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  HomeScreen: {newTarget: any; type: string};
  LanguagesScreen: {target: any; type: string};
  FavoritesScreen: undefined;
};
export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;
