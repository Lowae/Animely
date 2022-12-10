import {FlatList, SafeAreaView, Text} from 'react-native';
import AnimeItem from './AnimeItem';
import {gotoDetails} from '../../Navigations';
import React from 'react';

export default function AnimeList({navigation, title, data}) {
  return data.length === 0 ? (
    <Text>没有数据</Text>
  ) : (
    <FlatList
      stickyHeaderIndices={[0]}
      ListHeaderComponent={() => (
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            padding: 12,
            paddingTop: 38,
            backgroundColor: '#f5f5f5',
          }}>
          {title}
        </Text>
      )}
      numColumns={3}
      data={data}
      renderItem={info => {
        return (
          <AnimeItem
            onPress={() => gotoDetails(navigation, info.item.detailUrl)}
            item={info.item}
          />
        );
      }}
    />
  );
}
