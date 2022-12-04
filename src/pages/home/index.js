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
  }

  componentDidMount() {
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

  render() {
    let {navigation} = this.props;
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
          {this.state.groups.length > 0 ? (
            <SectionList
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
class AnimeSections extends React.Component {
  constructor(props) {
    super(props);
  }

  renderAnime = ({item}) => {
    return (
      <View
        style={{
          width: '45%',
          height: (ScreenWidth * 0.45) / 0.72,
          marginBottom: 36,
        }}>
        <TouchableOpacity
          onPress={this.props.onPress.bind(this, item.detailUrl)}
          activeOpacity={0.8}
          style={{
            overflow: 'hidden',
            borderRadius: 16,
            elevation: 4,
          }}>
          <ImageBackground
            style={{height: '100%'}}
            source={{uri: item.image}}
          />
          <Text
            style={{
              position: 'absolute',
              bottom: 0,
              end: 0,
              padding: 4,
              fontSize: 11,
              marginStart: 6,
              borderTopLeftRadius: 12,
              borderBottomRightRadius: 12,
              backgroundColor: 'rgba(0,0,0,0.5)',
              marginTop: 6,
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
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-around'}}
        keyExtractor={(item, index) => item + index}
        renderItem={info => {
          return this.renderAnime(info);
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
