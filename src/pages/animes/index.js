import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {PageParser} from '../../utils/yinghua/Parser';
import AnimeItem from './AnimeItem';
import {gotoDetails} from '../../Navigations';
import {ActivityIndicator} from 'react-native-paper';
import AnimeList from './AnimeList';

// Later on in your styles.
const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default class Animes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadFinished: false,
      title: '',
      data: [],
    };
    const {route} = this.props;
    const {tagUrl} = route.params;
    PageParser(tagUrl).then(result => {
      this.setState({
        isLoadFinished: true,
        title: result.title,
        data: result.data,
      });
      return result;
    });
  }

  render() {
    const {navigation, theme} = this.props;
    return (
      <SafeAreaView style={{flex: 1}}>
        {!this.state.isLoadFinished ? (
          <ActivityIndicator
            style={{flex: 1}}
            theme={theme}
            animating={true}
            hidesWhenStopped={false}
            size="large"
          />
        ) : (
          <AnimeList
            navigation={navigation}
            title={this.state.title}
            data={this.state.data}
          />
        )}
      </SafeAreaView>
    );
  }
}
