import React from 'react';
import {Text, View} from 'react-native';

import {Banners} from '../../utils/yinghua/Parser.js';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      banners: [],
    };
    Banners.then(result => {
      this.setState({
        banners: result,
      });
    });
  }

  render() {
    return (
      <View>
        <Text>Animely动漫</Text>
        <Text>{this.state.banners}</Text>
      </View>
    );
  }
}
