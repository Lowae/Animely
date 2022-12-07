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
import Collapsible from 'react-native-collapsible';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cover: '',
      name: '',
      description: '',
      tags: [],
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

  gotoTagPage(tagUrl) {
    console.log('gotoTagPage: ' + tagUrl);
    const {navigation} = this.props;
    navigation.navigate('Animes', {tagUrl: tagUrl});
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

  renderTags(item) {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => this.gotoTagPage(item.href)}
        style={{
          marginEnd: 8,
          paddingStart: 8,
          paddingEnd: 8,
          backgroundColor: 'rgb(238,238,240)',
          borderWidth: 1,
          borderRadius: 8,
          borderColor: 'rgb(228,228,236)',
        }}>
        <Text style={{color: '#171717'}}>{item.tag}</Text>
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
              <View style={{marginTop: 32, alignItems: 'center'}}>
                <Image
                  source={{uri: this.state.cover || null}}
                  style={{
                    width: ScreenWidth * 0.4,
                    height: (ScreenWidth * 0.4) / 0.72,
                    borderRadius: 16,
                  }}
                />
                <Text
                  style={{
                    marginTop: 12,
                    fontSize: 18,
                    fontStyle: 'bold',
                    color: 'black',
                    textAlign: 'center',
                  }}>
                  {this.state.name}
                </Text>
                <FlatList
                  style={{marginTop: 12}}
                  horizontal={true}
                  data={this.state.tags}
                  keyExtractor={item => item.tag + item.href}
                  renderItem={({item}) => this.renderTags(item)}
                />
              </View>
              <Text style={styles.blockTitle}>动漫介绍：</Text>
              <CollapsibleText description={this.state.description} />
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

const CollapsibleText = ({description}) => {
  const [collapsed, setCollapsed] = React.useState(true);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <View>
      <Collapsible collapsed={collapsed} collapsedHeight={124}>
        <Text>{description}</Text>
      </Collapsible>
      {collapsed && (
        <TouchableOpacity
          style={{
            height: 32,
            bottom: -12,
            width: '100%',
            position: 'absolute',
            alignContent: 'center',
          }}
          onPress={toggle}>
          <LinearGradient
            colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255, 1)']}>
            <View style={{alignItems: 'center', marginTop: 8}}>
              <Ionicons size={20} color={'gray'} name={'chevron-down'} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingStart: 12,
    paddingEnd: 12,
    backgroundColor: '#ffffff',
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
