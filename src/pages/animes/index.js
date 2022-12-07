import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {PageParser} from '../../utils/yinghua/Parser';
import AnimeItem from './AnimeItem';
import {gotoDetails} from '../../Navigations';

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
      title: '',
      data: [],
    };
    const {route} = this.props;
    const {tagUrl} = route.params;
    PageParser(tagUrl).then(result => {
      this.setState({
        title: result.title,
        data: result.data,
      });
      console.log(tagUrl);
      return result;
    });
  }

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView>
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            padding: 12,
            marginTop: 12,
            backgroundColor: '#f5f5f5',
          }}>
          {this.state.title}
        </Text>
        <FlatList
          numColumns={3}
          data={this.state.data}
          renderItem={info => {
            return (
              <AnimeItem
                onPress={() => gotoDetails(navigation, info.item.detailUrl)}
                item={info.item}
              />
            );
          }}
        />
      </SafeAreaView>
    );
  }
}
