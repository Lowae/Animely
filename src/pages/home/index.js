import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  ImageBackground,
} from 'react-native';
import Swiper from 'react-native-swiper';

import {Banners} from '../../utils/yinghua/Parser.js';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      banners: [],
    };
  }

  componentDidMount() {
    Banners.then(result => {
      this.setState({
        banners: result,
      });
    }).finally(() => {
      console.log('success');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
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
            //cover: 等比例放大; center:不变; contain:不变; stretch:填充;
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
    );
  }
}

const styles = StyleSheet.create({
  container: {width: '100%', height: '25%', backgroundColor: 'gray'},
});
