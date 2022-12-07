import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './pages/home';
import Detail from './pages/detail';
import Player from './pages/player';
import Animes from './pages/animes';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerMode: 'none',
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Player" component={Player} />
      <Stack.Screen name="Animes" component={Animes} />
    </Stack.Navigator>
  );
}

export function gotoDetails(navigation, detailUrl) {
  navigation.push('Detail', {detailUrl: detailUrl});
}
