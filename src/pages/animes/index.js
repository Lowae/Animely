import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {ActivityIndicator, Appbar, Searchbar} from 'react-native-paper';
import AnimeList from './AnimeList';
import {connect} from 'react-redux';
import {
  mapFromParserToProps,
  mapSourceToParserProps,
} from '../../redux/reducers/DataSource';

class Animes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadFinished: false,
      title: '',
      data: [],
    };
    const {route} = this.props;
    const {tagUrl} = route.params;
    this.props.source.parser.pageParser(tagUrl).then(result => {
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
          <View>
            <Appbar
              elevated={true}
              style={{
                height: 86,
                backgroundColor: theme.colors.elevation.level2,
                paddingTop: 36,
              }}>
              <Appbar.BackAction onPress={() => navigation.goBack()} />
              <Appbar.Content
                title={this.state.title}
                color={theme.colors.onBackground}
                style={{marginStart: 8}}
              />
            </Appbar>
            <AnimeList navigation={navigation} data={this.state.data} />
          </View>
        )}
      </SafeAreaView>
    );
  }
}
export default connect(mapFromParserToProps, null)(Animes);
