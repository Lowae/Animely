import {Alert, Keyboard, SafeAreaView} from 'react-native';
import {Appbar, Searchbar} from 'react-native-paper';
import * as React from 'react';
import {useEffect, useRef} from 'react';

const Search = ({navigation, theme}) => {
  const [query, setQuery] = React.useState('');
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = event => {
    };

    const element = ref.current;

    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  const _keyboardDidHide = event => {
    console.log(JSON.stringify(event));
  };

  return (
    <SafeAreaView>
      <Appbar
        elevated={true}
        style={{
          height: 86,
          backgroundColor: theme.colors.elevation.level2,
          paddingTop: 36,
        }}>
        <Searchbar
          ref={ref}
          placeholder="搜索番剧~"
          elevation={0}
          value={query}
          onChangeText={setQuery}
          onIconPress={() => navigation.goBack()}
          icon={{source: 'arrow-left', direction: 'auto'}}
        />
      </Appbar>
    </SafeAreaView>
  );
};

export default Search;
