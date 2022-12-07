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
  Alert,
} from 'react-native';
import {VideoParser} from '../../utils/yinghua/Parser';
import Video from 'react-native-video';

// Later on in your styles..
const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playUrl: '',
    };
    const {route} = this.props;
    const {playUrl} = route.params;
    VideoParser(playUrl).then(result => {
      this.setState({
        playUrl: result,
      });
      return result;
    });
  }

  render() {
    console.log(this.state.playUrl);
    return (
      <View style={{width: '100%', height: '100%', backgroundColor: 'black'}}>
        {this.state.playUrl === '' ? null : (
          <Video
            source={{
              uri: this.state.playUrl,
            }}
            controls={true}
            ref={ref => {
              this.player = ref;
            }} // Store reference
            style={{width: '100%', height: '100%'}}
            onError={Error => Alert.alert(Error)} // Callback when video cannot be loaded
          />
        )}
      </View>
    );
  }
}
