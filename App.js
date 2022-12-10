/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  adaptNavigationTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Navigation from './src/Navigations';
import {MD3Theme} from 'react-native-paper';

export const DefaultLightTheme: MD3Theme = {
  dark: false,
  roundness: 4,
  isV3: true,
  colors: {
    primary: 'rgb(158, 42, 155)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(255, 215, 245)',
    onPrimaryContainer: 'rgb(56, 0, 56)',
    secondary: 'rgb(109, 88, 105)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(247, 218, 239)',
    onSecondaryContainer: 'rgb(39, 22, 36)',
    tertiary: 'rgb(130, 83, 69)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(255, 219, 209)',
    onTertiaryContainer: 'rgb(50, 18, 8)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(30, 26, 29)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(30, 26, 29)',
    surfaceVariant: 'rgb(238, 222, 231)',
    onSurfaceVariant: 'rgb(78, 68, 75)',
    outline: 'rgb(128, 116, 124)',
    outlineVariant: 'rgb(209, 194, 203)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(52, 47, 50)',
    inverseOnSurface: 'rgb(248, 238, 242)',
    inversePrimary: 'rgb(255, 170, 243)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(250, 241, 250)',
      level2: 'rgb(247, 234, 247)',
      level3: 'rgb(244, 228, 244)',
      level4: 'rgb(243, 226, 243)',
      level5: 'rgb(241, 222, 241)',
    },
    surfaceDisabled: 'rgba(30, 26, 29, 0.12)',
    onSurfaceDisabled: 'rgba(30, 26, 29, 0.38)',
    backdrop: 'rgba(55, 46, 52, 0.4)',
  },
};

const DefaultDarkTheme: MD3Theme = {
  dark: true,
  roundness: 4,
  isV3: true,
  colors: {
    primary: 'rgb(255, 170, 243)',
    onPrimary: 'rgb(91, 0, 91)',
    primaryContainer: 'rgb(129, 1, 129)',
    onPrimaryContainer: 'rgb(255, 215, 245)',
    secondary: 'rgb(218, 191, 210)',
    onSecondary: 'rgb(61, 43, 58)',
    secondaryContainer: 'rgb(85, 65, 81)',
    onSecondaryContainer: 'rgb(247, 218, 239)',
    tertiary: 'rgb(245, 184, 167)',
    onTertiary: 'rgb(76, 38, 27)',
    tertiaryContainer: 'rgb(102, 60, 47)',
    onTertiaryContainer: 'rgb(255, 219, 209)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(30, 26, 29)',
    onBackground: 'rgb(233, 224, 228)',
    surface: 'rgb(30, 26, 29)',
    onSurface: 'rgb(233, 224, 228)',
    surfaceVariant: 'rgb(78, 68, 75)',
    onSurfaceVariant: 'rgb(209, 194, 203)',
    outline: 'rgb(154, 141, 149)',
    outlineVariant: 'rgb(78, 68, 75)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(233, 224, 228)',
    inverseOnSurface: 'rgb(52, 47, 50)',
    inversePrimary: 'rgb(158, 42, 155)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(41, 33, 40)',
      level2: 'rgb(48, 38, 46)',
      level3: 'rgb(55, 42, 53)',
      level4: 'rgb(57, 43, 55)',
      level5: 'rgb(62, 46, 59)',
    },
    surfaceDisabled: 'rgba(233, 224, 228, 0.12)',
    onSurfaceDisabled: 'rgba(233, 224, 228, 0.38)',
    backdrop: 'rgba(55, 46, 52, 0.4)',
  },
};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isDarkMode: false,
      theme: this.isDarkMode ? DefaultDarkTheme : DefaultLightTheme,
    };
  }

  render() {
    return (
      <PaperProvider theme={DefaultTheme}>
        <NavigationContainer>
          <Navigation theme={this.state.theme} />
        </NavigationContainer>
      </PaperProvider>
    );
  }
}
