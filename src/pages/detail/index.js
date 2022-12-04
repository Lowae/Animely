import React from 'react';
import {
  Button,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {DetailParser} from '../../utils/yinghua/Parser';
import {ScreenHeight, ScreenWidth} from '../../utils/screens/ScreenUtils';
import {BlurView} from '@react-native-community/blur';

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cover: '',
      name: '',
      star: '',
      description: '',
      playlists: [],
      recommends: [],
    };
    const {route} = this.props;
    const {detailUrl} = route.params;
    DetailParser(detailUrl).then(result => {
      this.setState(result);
      return result;
    });
  }

  gotoPlayer(playUrl) {
    console.log('gotoPlayer: ' + playUrl);
    const {navigation} = this.props;
    navigation.navigate('Player', {playUrl: playUrl});
  }

  renderEpisode(item) {
    return (
      <Text
        onPress={() => this.gotoPlayer(item.playUrl)}
        style={{
          width: 72,
          padding: 6,
          borderWidth: 1,
          marginEnd: 8,
          borderRadius: 16,
          textAlign: 'center',
        }}>
        {`第${item.episode}集`}
      </Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <Image
          key={'blurryImage'}
          source={{uri: this.state.cover || null}}
          style={styles.absolute}
        />
        {/* in terms of positioning and zIndex-ing everything before the BlurView will be blurred */}
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />

        <View style={{flexDirection: 'row', marginTop: 32}}>
          <Image
            source={{uri: this.state.cover || null}}
            style={{
              width: ScreenWidth * 0.4,
              height: (ScreenWidth * 0.4) / 0.72,
              borderRadius: 16,
            }}
          />
          <View style={{marginStart: 12, flexShrink: 1}}>
            <Text
              style={{
                fontSize: 18,
                fontStyle: 'bold',
                color: 'black',
              }}>
              {this.state.name}
            </Text>
          </View>
        </View>
        <Text style={{color: 'black', marginTop: 12}}>动漫介绍：</Text>
        <Text style={{marginTop: 12}}>{this.state.description}</Text>
        <Text style={{color: 'black', marginTop: 12}}>播放列表：</Text>
        <FlatList
          style={{marginTop: 12}}
          horizontal={true}
          data={this.state.playlists}
          keyExtractor={item => item.episode + item.playUrl}
          renderItem={({item}) => this.renderEpisode(item)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingStart: 12,
    backgroundColor: 'gray',
  },
  absolute: {
    position: 'absolute',
    height: ScreenHeight,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
