import {Alert, Keyboard, SafeAreaView} from 'react-native';
import {ActivityIndicator, Appbar, Searchbar} from 'react-native-paper';
import * as React from 'react';
import AnimeList from './AnimeList';
import {getCurrentParserSource} from '../../redux/reducers/DataSource';

const Search = ({navigation, theme}) => {
  const [query, setQuery] = React.useState('');

  const [searchResult, setSearchResult] = React.useState({
    title: '',
    data: [],
  });
  const [isSearching, setIsSearching] = React.useState(false);

  const SearchAction = keywords => {
    setIsSearching(true);
    getCurrentParserSource()
      .parser.searchParser('/search/' + keywords)
      .then(r => {
        setIsSearching(false);
        setSearchResult({
          title: r.title,
          data: r.data,
        });
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Appbar
        elevated={true}
        style={{
          height: 86,
          backgroundColor: theme.colors.elevation.level2,
          paddingTop: 36,
        }}>
        <Searchbar
          placeholder="搜索番剧~"
          elevation={0}
          value={query}
          onSubmitEditing={() => SearchAction(query)}
          onChangeText={setQuery}
          onIconPress={() => navigation.goBack()}
          icon={{source: 'arrow-left', direction: 'auto'}}
        />
      </Appbar>
      {isSearching === true ? (
        <ActivityIndicator size={'large'} theme={theme} style={{flex: 1}} />
      ) : (
        <AnimeList navigation={navigation} data={searchResult.data} />
      )}
    </SafeAreaView>
  );
};

export default Search;
