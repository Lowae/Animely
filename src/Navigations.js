import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from './pages/home';
import Detail from './pages/detail';
import Player from './pages/player';
import Animes from './pages/animes';
import Search from './pages/animes/Search';
import Setting from './pages/setting';
import About from './pages/setting/About';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
        <Stack.Screen name="Setting">
          {props => {
            return <Setting {...props} theme={theme} />;
          }}
        </Stack.Screen>
        <Stack.Screen name="About">
          {props => {
            return <About {...props} theme={theme} />;
          }}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
}

function HomeDrawer(props) {
  const {theme} = props;
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={'Home'}>
        <Home {...props} theme={theme} />
      </Drawer.Screen>
    </Drawer.Navigator>
  );
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

export function gotoSetting(navigation) {
  navigation.navigate('Setting');
}
