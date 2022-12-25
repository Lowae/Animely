import {View, Linking} from 'react-native';
import {Appbar, List, Text} from 'react-native-paper';
import DialogWithLongText from '../../components/DialogWithLongText';
import React, {useEffect} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const About = ({navigation, theme}) => {
  const {bottom, left, right} = useSafeAreaInsets();
  const [visible, setVisible] = React.useState(false);

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
          title="关于"
          color={theme.colors.onBackground}
          style={{marginStart: 8}}
        />
      </Appbar>

      <List.Item
        onPress={() => setVisible(true)}
        theme={theme}
        title="使用须知"
        description="此软件仅供个人学习与交流使用。"
        left={props => <List.Icon {...props} icon="alert-box" />}
      />
      <List.Item
        onPress={() => {
          Linking.openURL('https://github.com/Lowae/Animely');
        }}
        theme={theme}
        title="Github"
        description="https://github.com/Lowae/Animely"
        left={props => <List.Icon {...props} icon="github" />}
      />
      <DialogWithLongText
        visible={visible}
        close={() => setVisible(false)}
        theme={theme}
      />
    </View>
  );
};

export default About;
