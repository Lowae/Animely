import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './pages/home';
import Detail from './pages/detail';
import Player from './pages/player';
import Animes from './pages/animes';
import Search from './pages/animes/Search';

const Stack = createStackNavigator();

export default class Navigation extends React.Component {
  render() {
    const {theme} = this.props;
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerMode: 'none',
        }}>
        <Stack.Screen name="Home">
          {props => {
            return <Home {...props} theme={theme} />;
          }}
        </Stack.Screen>
        <Stack.Screen name="Detail">
          {props => {
            return <Detail {...props} theme={theme} />;
          }}
        </Stack.Screen>
        <Stack.Screen name="Player" component={Player} />
        <Stack.Screen name="Animes">
          {props => {
            return <Animes {...props} theme={theme} />;
          }}
        </Stack.Screen>
        <Stack.Screen name="Search">
          {props => {
            return <Search {...props} theme={theme} />;
          }}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
}

export function gotoDetails(navigation, detailUrl) {
  navigation.push('Detail', {detailUrl: detailUrl});
}

export function gotoTagPage(navigation, tagUrl) {
  navigation.push('Animes', {tagUrl: tagUrl});
}

export function gotoSearch(navigation) {
  navigation.push('Search');
}
