import {Text, View} from 'react-native';
import {Appbar, List, useTheme} from 'react-native-paper';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Setting = ({navigation, theme}) => {
  const {bottom, left, right} = useSafeAreaInsets();
  return (
    <View style={{backgroundColor: theme.colors.background}}>
      <Appbar
        safeAreaInsets={{bottom, left, right}}
        elevated={true}
        style={{
          height: 86,
          backgroundColor: theme.colors.elevation.level2,
          paddingTop: 32,
        }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="设置"
          color={theme.colors.onBackground}
          style={{marginStart: 8}}
        />
      </Appbar>

      <List.Item
        onPress={() => navigation.navigate('About')}
        theme={theme}
        title="关于"
        left={props => <List.Icon {...props} icon="alert-circle" />}
      />
    </View>
  );
};
export default Setting;
