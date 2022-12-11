import {FlatList, SafeAreaView, Text} from 'react-native';
import AnimeItem from './AnimeItem';
import {gotoDetails} from '../../Navigations';
import React from 'react';

export default function AnimeList({navigation, title, data}) {
  return data.length === 0 ? (
    <Text style={{marginTop: 12, marginStart: 12}}>没有数据...</Text>
  ) : (
    <FlatList
      style={{marginTop: 12}}
      contentContainerStyle={{
        alignContent: 'space-around',
      }}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={() =>
        title === undefined ? null : (
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              paddingStart: 12,
              paddingBottom: 12,
              backgroundColor: '#f5f5f5',
            }}>
            {title}
          </Text>
        )
      }
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
