import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {ScreenWidth} from '../../utils/screens/ScreenUtils';
import React from 'react';

export default class AnimeItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={this.props.onPress.bind(this, this.props.item.detailUrl)}
          activeOpacity={0.8}
          style={{
            width: ScreenWidth * 0.3,
            height: (ScreenWidth * 0.3) / 0.72,
            overflow: 'hidden',
            borderRadius: 16,
            elevation: 4,
          }}>
          <ImageBackground
            style={{height: '100%', backgroundColor: '#DCDCDC'}}
            source={{uri: this.props.item.image}}
          />
          <Text
            style={{
              position: 'absolute',
              bottom: 0,
              end: 0,
              padding: 4,
              fontSize: 11.5,
              borderTopLeftRadius: 12,
              borderBottomRightRadius: 12,
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
            }}>
            {this.props.item.description}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 13,
            marginStart: 6,
            marginTop: 6,
            color: 'black',
            marginBottom: 6,
          }}>
          {this.props.item.name}
        </Text>
      </View>
    );
  }
}
export class renderAnime {}
