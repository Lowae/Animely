import WebView from 'react-native-webview';
import {UserAgent} from '../../utils/http/HttpUtils';
import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import {
  ActivityIndicator,
  Appbar,
  ProgressBar,
  Snackbar,
} from 'react-native-paper';
import {gotoPlayer, gotoSetting} from '../../Navigations';
import BackHandler from 'react-native/Libraries/Utilities/BackHandler';
import {connect} from 'react-redux';
import {mapFromWebToProps} from '../../redux/reducers/DataSource';

const Web = props => {
  const {source, theme, navigation} = props;
  const [currentUrl, setCurrentUrl] = React.useState(source.url);
  const [navState, setNavState] = React.useState(null);
  const [videoUrl, setVideoUrl] = React.useState('');
  const [snackBarVisible, setSnackBarVisible] = React.useState(false);
  const [isPauseBackHandle, setIsPauseBackHandler] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const webviewRef = React.useRef(null); // ref => { current: null }

  useEffect(() => {
    const backAction = () => {
      if (isPauseBackHandle) {
        setIsPauseBackHandler(false);
        return false;
      }
      if (navState.canGoBack) {
        webviewRef.current.goBack();
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [isPauseBackHandle, navState]);

  const handleWebViewNavigationStateChange = newNavState => {
    setNavState(newNavState);
    const {url: navUrl} = newNavState;
    if (!navUrl) {
      return;
    }
    setCurrentUrl(navUrl);
    if (!navUrl.includes('malimali')) {
      webviewRef.current.stopLoading();
      webviewRef.current.goBack();
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <StatusBar
        hidden={false}
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'dark-content'}
      />
      <Appbar
        elevated={true}
        style={{
          height: 86,
          backgroundColor: theme.colors.elevation.level4,
          paddingTop: 32,
        }}>
        <Appbar.Action
          color={theme.colors.onBackground}
          icon="menu"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <Appbar.Content
          title={'Animely'}
          color={theme.colors.onBackground}
          style={{marginStart: 8}}
        />
        <Appbar.Action
          color={theme.colors.onBackground}
          icon="refresh"
          onPress={() => {
            webviewRef.current.reload();
          }}
        />
        <Appbar.Action
          color={theme.colors.onBackground}
          icon="home-variant-outline"
          onPress={() => {
            setCurrentUrl(source.url);
            console.log(currentUrl);
            webviewRef.current.reload();
          }}
        />
        <Appbar.Action
          color={theme.colors.onBackground}
          icon="cog-outline"
          onPress={() => gotoSetting(navigation)}
          r
        />
      </Appbar>
      <WebView
        ref={webviewRef}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onNavigationStateChange={handleWebViewNavigationStateChange}
        userAgent={UserAgent}
        startInLoadingState={true}
        renderLoading={() => (
          <ProgressBar
            indeterminate
            visible={isLoading}
            style={{position: 'absolute', bottom: 0}}
          />
        )}
        allowsFullscreenVideo={true}
        onMessage={event => {
          console.log('onMessage: ' + JSON.stringify(event.nativeEvent));
          const parsedUrl = event.nativeEvent.data;
          if (parsedUrl.split('.').pop() === 'm3u8') {
            setVideoUrl(parsedUrl);
            setSnackBarVisible(true);
          }
        }}
        mixedContentMode="compatibility"
        source={{uri: currentUrl}}
        onLoadStart={event => {
          setIsLoading(true);
          console.log('onLoadStart');
        }}
        onLoadEnd={event => {
          setIsLoading(false);
          console.log('onLoadEnd');
        }}
        style={{flex: 1, paddingTop: 48}}
      />
      <Snackbar
        visible={snackBarVisible}
        onDismiss={() => {
          setSnackBarVisible(false);
        }}
        action={{
          label: 'GO',
          onPress: () => {
            setIsPauseBackHandler(true);
            gotoPlayer(navigation, videoUrl);
          },
        }}
        duration={Snackbar.DURATION_MEDIUM}>
        解析到视频链接，是否跳转至内置播放器?
      </Snackbar>
    </View>
  );
};

const INJECTED_JAVASCRIPT = `
      const videoUrl = new URL(document.querySelector('.MacPlayer table iframe').src).searchParams.get('url')
      window.ReactNativeWebView.postMessage(videoUrl)
      true; // note: this is required, or you'll sometimes get silent failures
    `;

export default connect(mapFromWebToProps, null)(Web);
