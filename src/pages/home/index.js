import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  ImageBackground,
  ScrollView,
  SectionList,
} from 'react-native';
import Swiper from 'react-native-swiper';

import {Banners} from '../../utils/yinghua/Parser.js';
import {ScreenWidth, ScreenHeight} from '../../utils/screens/ScreenUtils';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      banners: [],
      groups: [],
    };
  }

  componentDidMount() {
    Banners.then(result => {
      this.setState({
        banners: result.banners,
        groups: result.groups,
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <View style={{width: '100%', height: ScreenHeight * 0.25}}>
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
              console.log(item.image, index);
              return (
                <View key={index}>
                  <ImageBackground
                    style={{height: '100%', justifyContent: 'flex-end'}}
                    resizeMode="cover"
                    source={{uri: item.image}}>
                    <Text
                      style={{
                        color: 'white',
                        width: '100%',
                        fontSize: 18,
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

        <View style={{flex: 1}}>
          <View
            style={{
              width: '100%',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginTop: 32,
                marginStart: 16,
              }}>
              新番连载
            </Text>

            <Text
              style={{
                fontSize: 14,
                marginTop: 32,
                marginEnd: 16,
              }}>
              更多>
            </Text>
          </View>
          {this.state.groups.length > 0
            ? console.log(this.state.groups)
            : console.log('Empry Sections')}
          {this.state.groups.length > 0 ? (
            <SectionList
              sections={this.state.groups}
              keyExtractor={(anime, index) => {
                return anime.name + index;
              }}
              // renderItem={item => {
              //   console.log('Item: ' + JSON.stringify(item));
              // }}
              renderItem={({item}) => <AnimeGroup anime={item} />}
              renderSectionHeader={item => {
                return (
                  <Text style={{fontSize: 18, padding: 12}}>
                    {item.section.title}
                  </Text>
                );
              }}
            />
          ) : (
            console.log(`Empty: ${this.state.groups.length}`)
          )}
        </View>
      </View>
    );
  }
}

const AnimeGroup = ({anime}) => {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <Image
        style={{
          marginBottom: 12,
          width: ScreenWidth,
          height: 200,
          resizeMode: 'cover',
        }}
        source={{uri: anime.image}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});
