import React from 'react';
import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DetailParser} from '../../utils/yinghua/Parser';
import {ScreenWidth} from '../../utils/screens/ScreenUtils';

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
      <TouchableOpacity activeOpacity={0.8} style={styles.episode}>
        <Text
          style={{fontSize: 12}}
          color="#B0C4DE"
          onPress={() => this.gotoPlayer(item.playUrl)}>
          {item.episode}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        contentContainerStyle={{
          justifyContent: 'space-evenly',
        }}
        ListHeaderComponent={() => {
          return (
            <View>
              <StatusBar backgroundColor={'transparent'} translucent={true} />
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
              <Text style={styles.blockTitle}>动漫介绍：</Text>
              <Text style={{color: '#696969'}}>{this.state.description}</Text>
              <Text style={styles.blockTitle}>播放列表：</Text>
            </View>
          );
        }}
        numColumns={6}
        showsVerticalScrollIndicator={false}
        data={this.state.playlists}
        keyExtractor={item => item.episode + item.playUrl}
        renderItem={({item}) => this.renderEpisode(item)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingStart: 12,
    paddingEnd: 12,
    backgroundColor: '#f5f5f5',
  },
  episode: {
    width: 52,
    height: 33,
    marginVertical: 4,
    marginHorizontal: 4.5,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DCDCDC',
  },
  blockTitle: {
    color: 'black',
    marginTop: 12,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
