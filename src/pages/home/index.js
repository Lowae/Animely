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
  Image,
} from 'react-native';
import Swiper from 'react-native-swiper';

import {HomeParser} from '../../utils/yinghua/Parser.js';
import {ScreenWidth, ScreenHeight} from '../../utils/screens/ScreenUtils';
import AnimeItem, {renderAnime} from '../animes/AnimeItem';
import {gotoDetails, gotoSearch, gotoSetting} from '../../Navigations';
import {ActivityIndicator, Appbar, TouchableRipple} from 'react-native-paper';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
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
    const {navigation} = this.props;
    const {colors} = this.props.theme;
    return (
      <View
        style={{
          marginStart: 8,
          marginEnd: 8,
          marginTop: 8,
          height: ScreenHeight * 0.25,
          alignSelf: 'center',
          overflow: 'hidden',
          borderRadius: 16,
          backgroundColor: colors.background,
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
              <TouchableOpacity
                key={index}
                onPress={() => gotoDetails(navigation, item.detailUrl)}
                activeOpacity={0.85}>
                <Image
                  style={{
                    height: '100%',
                    justifyContent: 'flex-end',
                  }}
                  resizeMode="cover"
                  source={{uri: item.image}}
                />
                <Text
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    start: 0,
                    color: '#FFF0F5',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginStart: 12,
                    marginBottom: 8,
                  }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Swiper>
      </View>
    );
  };

  render() {
    let {navigation, theme} = this.props;
    return (
      <SafeAreaView
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <StatusBar
          backgroundColor={'transparent'}
          translucent={true}
          barStyle={'dark-content'}
        />
        <Appbar
          elevated={true}
          style={{
            height: 86,
            backgroundColor: theme.colors.elevation.level2,
            paddingTop: 32,
          }}>
          <Appbar.Action
            color={theme.colors.onBackground}
            icon="menu"
            onPress={() => {}}
          />
          <Appbar.Content
            title="Animely"
            color={theme.colors.onBackground}
            style={{marginStart: 8}}
          />
          <Appbar.Action
            color={theme.colors.onBackground}
            icon="magnify"
            onPress={() => gotoSearch(navigation)}
          />
          <Appbar.Action
            color={theme.colors.onBackground}
            icon="cog-outline"
            onPress={() => gotoSetting(navigation)}
          />
        </Appbar>
        {this.state.groups.length === 0 ? (
          <ActivityIndicator
            style={{flex: 1}}
            theme={theme}
            animating={true}
            hidesWhenStopped={false}
            size="large"
          />
        ) : (
          <SectionList
            showsVerticalScrollIndicator={false}
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
                    color: theme.colors.onBackground,
                    fontSize: 18,
                    padding: 12,
                    backgroundColor: theme.colors.background,
                  }}>
                  {item.section.title}
                </Text>
              );
            }}
          />
        )}
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
