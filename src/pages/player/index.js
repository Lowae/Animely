import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import Video from 'react-native-video';
import {connect} from 'react-redux';
import {mapFromParserToProps} from '../../redux/reducers/DataSource';
import WebView from 'react-native-webview';
import {UserAgent} from '../../utils/http/HttpUtils';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playUrl: '',
    };
  }

  componentDidMount() {
    const {route} = this.props;
    const {originUrl} = route.params;
    if (originUrl.endsWith('.m3u8')) {
      this.setState({
        playUrl: originUrl,
      });
    } else {
      this.props.source.parser.videoParser(originUrl).then(result => {
        this.setState({
          playUrl: result.playUrl,
        });
        return result;
      });
    }
  }

  render() {
    console.log('Video: ' + this.state.playUrl);
    return (
      <View style={{width: '100%', height: '100%', backgroundColor: 'black'}}>
        {this.state.playUrl === '' ? null : (
          <PlayerInner playUrl={this.state.playUrl} />
        )}
      </View>
    );
  }
}

const PlayerInner = ({playUrl}) => {
  if (playUrl === '') {
    return null;
  }
  const urlSuffix = playUrl.split('.').pop();
  if (urlSuffix === 'm3u8' || urlSuffix === 'mp4') {
    return (
      <Video
        source={{
          uri: playUrl,
        }}
        controls={true}
        ref={ref => {
          this.player = ref;
        }} // Store reference
        style={{width: '100%', height: '100%'}}
        onError={Error => Alert.alert(Error)} // Callback when video cannot be loaded
      />
    );
  } else {
    return (
      <WebView
        injectedJavaScript={INJECTED_JAVASCRIPT}
        forceDarkOn={true}
        userAgent={UserAgent}
        allowsFullscreenVideo={true}
        onMessage={event => {}}
        mixedContentMode="compatibility"
        source={{uri: playUrl}}
        style={{width: '100%', height: '100%'}}
      />
    );
  }
};

const INJECTED_JAVASCRIPT = `
      const videoUrl = new URL(document.querySelector('.MacPlayer table iframe').src).searchParams.get('url')
      window.alert(videoUrl)
      true; // note: this is required, or you'll sometimes get silent failures
    `;

export default connect(mapFromParserToProps, null)(Player);
