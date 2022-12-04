/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/Navigations';

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    );
  }
}
