import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ImageBackground,
  SectionList,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Swiper from 'react-native-swiper';

import {HomeParser} from '../../utils/yinghua/Parser.js';
import {ScreenWidth, ScreenHeight} from '../../utils/screens/ScreenUtils';
import AnimeItem, {renderAnime} from '../animes/AnimeItem';
import {gotoDetails} from '../../Navigations';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      banners: [],
      groups: [],
    };
    HomeParser.then(result => {
      this.setState({
        banners: result.banners,
        groups: result.groups,
      });
    });
  }
  renderSectionsHeader = () => {
    return (
      <View
        style={{
          marginStart: 8,
          marginEnd: 8,
          height: ScreenHeight * 0.25,
          alignSelf: 'center',
          overflow: 'hidden',
          borderRadius: 16,
        }}>
        <Swiper
          autoplay={true}
          height={200}
          showsPagination={true}
          dot={
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,.2)',
                width: 5,
                height: 5,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: '#666',
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
              }}
            />
          }
          paginationStyle={{
            bottom: 10,
            left: null,
            right: 12,
          }}
          horizontal={true}
          removeClippedSubviews={false}>
          {this.state.banners.map((item, index) => {
            return (
              <View key={index}>
                <ImageBackground
                  style={{
                    height: '100%',
                    justifyContent: 'flex-end',
                  }}
                  resizeMode="cover"
                  source={{uri: item.image}}>
                  <Text
                    style={{
                      color: '#FFF0F5',
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginStart: 12,
                      marginBottom: 8,
                    }}>
                    {item.title}
                  </Text>
                </ImageBackground>
              </View>
            );
          })}
        </Swiper>
      </View>
    );
  };

  render() {
    let {navigation} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={'transparent'}
          translucent={true}
          barStyle={'dark-content'}
        />
        <SectionList
          showsVerticalScrollIndicator={false}
          style={{marginTop: 32}}
          stickySectionHeadersEnabled={true}
          ListHeaderComponent={this.renderSectionsHeader}
          sections={this.state.groups}
          keyExtractor={(anime, index) => {
            return anime.name + index;
          }}
          renderItem={info => {
            if (info.index === 0) {
              return (
                <AnimeSections
                  sections={info.section}
                  onPress={detailUrl => gotoDetails(navigation, detailUrl)}
                />
              );
            } else {
              return null;
            }
          }}
          renderSectionHeader={item => {
            return (
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  padding: 12,
                  backgroundColor: '#f5f5f5',
                }}>
                {item.section.title}
              </Text>
            );
          }}
        />
      </SafeAreaView>
    );
  }
}
class AnimeSections extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const animes = this.props.sections;
    return (
      <FlatList
        data={animes.data}
        numColumns={3}
        keyExtractor={(item, index) => item + index}
        renderItem={info => {
          return <AnimeItem onPress={this.props.onPress} item={info.item} />;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f5f5f5'},
});
