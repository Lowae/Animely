import * as React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text} from 'react-native';

import {Button, Portal, Dialog} from 'react-native-paper';

const DialogWithLongText = ({visible, close, theme}) => (
  <Portal>
    <Dialog
      theme={theme}
      onDismiss={close}
      visible={visible}
      style={{maxHeight: 0.6 * Dimensions.get('window').height}}>
      <Dialog.Title>使用须知</Dialog.Title>
      <ScrollView contentContainerStyle={styles.biggerPadding}>
        <Text>
          基本声明：
          {'\n'}
          {'\n'}
          此软件仅供个人学习与交流使用，严禁用于商业以及不良用途，若发现任何商业行为以及不良用途，软件作者有权撤销使用权。
          {'\n'}
          {'\n'}
          免责声明：
          {'\n'}
          {'\n'}
          此软件只展示数据，不提供数据，且其版权均归原作者所有，所产生的版权问题，软件作者概不负责。
          {'\n'}
          {'\n'}
          任何直接或间接因使用此软件(Animely)的所导致的全部后果与此软件(Animely)的开发者无关。
          {'\n'}
        </Text>
      </ScrollView>
      <Dialog.Actions>
        <Button theme={theme} onPress={close}>
          确认
        </Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);

const styles = StyleSheet.create({
  smallPadding: {
    paddingHorizontal: 0,
  },
  biggerPadding: {
    paddingHorizontal: 24,
  },
});

export default DialogWithLongText;
