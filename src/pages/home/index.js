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

  gotoDetails(navigation, detailUrl) {
    navigation.navigate('Detail', {detailUrl: detailUrl});
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
        {this.state.groups.length > 0 ? (
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
                    onPress={detailUrl =>
                      this.gotoDetails(navigation, detailUrl)
                    }
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
        ) : (
          console.log(`Empty: ${this.state.groups.length}`)
        )}
      </SafeAreaView>
    );
  }
}
class AnimeSections extends React.Component {
  constructor(props) {
    super(props);
  }

  renderAnime = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={this.props.onPress.bind(this, item.detailUrl)}
          activeOpacity={0.8}
          style={{
            width: ScreenWidth * 0.3,
            height: (ScreenWidth * 0.3) / 0.72,
            overflow: 'hidden',
            borderRadius: 16,
            elevation: 4,
          }}>
          <ImageBackground
            style={{height: '100%', backgroundColor: '#DCDCDC'}}
            source={{uri: item.image}}
          />
          <Text
            style={{
              position: 'absolute',
              bottom: 0,
              end: 0,
              padding: 4,
              fontSize: 11.5,
              borderTopLeftRadius: 12,
              borderBottomRightRadius: 12,
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
            }}>
            {item.description}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 13,
            marginStart: 6,
            marginTop: 6,
            color: 'black',
            marginBottom: 6,
          }}>
          {item.name}
        </Text>
      </View>
    );
  };

  render() {
    const animes = this.props.sections;
    return (
      <FlatList
        data={animes.data}
        numColumns={3}
        keyExtractor={(item, index) => item + index}
        renderItem={info => {
          return this.renderAnime(info);
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f5f5f5'},
});
