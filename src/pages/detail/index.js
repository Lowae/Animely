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
import {ScreenWidth} from '../../utils/screens/ScreenUtils';
import {gotoPlayer, gotoTagPage} from '../../Navigations';
import {ActivityIndicator, Appbar, Chip} from 'react-native-paper';
import {FlatGrid} from 'react-native-super-grid';
import ReadMore from '@fawazahmed/react-native-read-more';
import {connect} from 'react-redux';
import {mapFromParserToProps} from '../../redux/reducers/DataSource';

class Detail extends React.Component {
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
    this.props.source.parser.detailParser(detailUrl).then(result => {
      this.setState(result);
      return result;
    });
  }

  renderEpisode(item) {
    const {navigation} = this.props;
    return (
      <Chip
        compact={true}
        mode={'outlined'}
        theme={this.props.theme}
        elevated
        style={{padding: 0, height: 36, justifyContent: 'center'}}
        onPress={() => gotoPlayer(navigation, item.playUrl)}>
        {item.episode}
      </Chip>
    );
  }
  renderTags(item) {
    const {navigation, theme} = this.props;
    return (
      <Chip
        mode={'outlined'}
        theme={theme}
        onPress={() => gotoTagPage(navigation, item.href)}
        textStyle={{
          fontSize: 12,
          textAlign: 'center',
        }}
        style={{
          margin: 3,
          paddingEnd: 1,
          paddingBottom: 1,
          borderRadius: 16,
        }}>
        {item.tag}
      </Chip>
    );
  }

  render() {
    const {navigation, theme} = this.props;
    return this.state.cover === '' ? (
      <ActivityIndicator
        style={{flex: 1}}
        theme={theme}
        animating={true}
        hidesWhenStopped={false}
        size="large"
      />
    ) : (
      <ScrollView>
        <View>
          <StatusBar
            backgroundColor={'transparent'}
            translucent={true}
            barStyle={'dark-content'}
          />
          <View style={{marginTop: 48, alignItems: 'center'}}>
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
              showsHorizontalScrollIndicator={false}
              style={{marginTop: 6}}
              horizontal={true}
              data={this.state.tags}
              keyExtractor={item => item.tag + item.href}
              renderItem={({item}) => this.renderTags(item)}
            />
          </View>
          <Text style={styles.blockTitle}>动漫介绍：</Text>
          <CollapsibleText description={this.state.description} theme={theme} />
          <Text style={styles.blockTitle}>播放列表：</Text>
          <FlatGrid
            showsHorizontalScrollIndicator={false}
            staticDimension={200}
            itemDimension={36}
            style={{height: 200, flex: 1}}
            horizontal={true}
            showsVerticalScrollIndicator={false}
            data={this.state.playlists}
            keyExtractor={item => item.episode + item.playUrl}
            renderItem={({item}) => this.renderEpisode(item)}
          />
        </View>
      </ScrollView>
    );
  }
}

const CollapsibleText = ({description, theme}) => {
  const [collapsed, setCollapsed] = React.useState(true);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <View style={{marginStart: 12, marginEnd: 12}}>
      <ReadMore
        numberOfLines={4}
        seeMoreText={'展开'}
        seeMoreStyle={{color: theme.colors.onBackground}}
        seeLessText={'收起'}
        seeLessStyle={{colors: theme.colors.onBackground}}>
        {description}
      </ReadMore>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    marginStart: 12,
    marginEnd: 12,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});

export default connect(mapFromParserToProps, null)(Detail);
