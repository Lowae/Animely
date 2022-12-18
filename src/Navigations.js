import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Home from './pages/home';
import Detail from './pages/detail';
import Player from './pages/player';
import Animes from './pages/animes';
import Search from './pages/animes/Search';
import Setting from './pages/setting';
import About from './pages/setting/About';
import {StyleSheet} from 'react-native';
import {useTheme, Drawer as PaperDrawer} from 'react-native-paper';
import Web from './pages/web';
import {connect} from 'react-redux';
import {mapDispatchToProps} from './redux/reducers/DataSource';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Navigation(props) {
  const {theme} = props;
  return (
    <Stack.Navigator
      initialRouteName="Root"
      screenOptions={{
        headerMode: 'none',
      }}>
      <Stack.Screen name="Root">
        {props => {
          return <Root {...props} theme={theme} />;
        }}
      </Stack.Screen>
      <Stack.Screen name="Detail">
        {props => {
          return <Detail {...props} theme={theme} />;
        }}
      </Stack.Screen>
      <Stack.Screen name="Player">
        {props => {
          return <Player {...props} theme={theme} />;
        }}
      </Stack.Screen>
      <Stack.Screen name="Animes">
        {props => {
          return <Animes {...props} theme={theme} />;
        }}
      </Stack.Screen>
      <Stack.Screen name="Search">
        {props => {
          return <Search {...props} theme={theme} />;
        }}
      </Stack.Screen>
      <Stack.Screen name="Setting">
        {props => {
          return <Setting {...props} theme={theme} />;
        }}
      </Stack.Screen>
      <Stack.Screen name="About">
        {props => {
          return <About {...props} theme={theme} />;
        }}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const Root = ({navigation, theme}) => {
  return (
    <Drawer.Navigator
      drawerContent={() => <DrawerContent navigation={navigation} />}>
      <Drawer.Screen
        name="Home"
        options={{headerShown: false}}
        initialParams={{label: '樱花动漫'}}>
        {props => {
          return <Home {...props} theme={theme} />;
        }}
      </Drawer.Screen>
      <Drawer.Screen name="Web" options={{headerShown: false}}>
        {props => {
          return <Web {...props} theme={theme} />;
        }}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

const DrawerContent = props => {
  const {navigation} = props;
  const {colors} = useTheme();
  const [drawerItemIndex, setDrawerItemIndex] = React.useState(0);
  return (
    <DrawerContentScrollView
      alwaysBounceVertical={false}
      style={[
        styles.drawerContent,
        {
          backgroundColor: colors.surface,
        },
      ]}>
      <PaperDrawer.Section title="番剧数据源:" style={{fontSize: 18}}>
        <PaperDrawer.Item
          active={drawerItemIndex === 0}
          label={'樱花动漫'}
          onPress={() => {
            setDrawerItemIndex(0);
            gotoHome(navigation, '樱花动漫');
          }}
          style={{height: 36, marginBottom: 12}}
        />
      </PaperDrawer.Section>
      <PaperDrawer.Section title="番剧网页源">
        <PaperDrawer.Item
          active={drawerItemIndex === 1}
          label={'嘛哩嘛哩'}
          onPress={() => {
            setDrawerItemIndex(1);
            gotoWeb(navigation, '嘛哩嘛哩');
          }}
          style={{height: 36, marginBottom: 12}}
        />
      </PaperDrawer.Section>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  v3Preference: {
    height: 56,
    paddingHorizontal: 28,
  },
  badge: {
    alignSelf: 'center',
  },
  collapsedSection: {
    marginTop: 16,
  },
  annotation: {
    marginHorizontal: 24,
  },
});

export function gotoHome(navigation, label) {
  navigation.navigate('Home', {label: label});
}

export function gotoDetails(navigation, detailUrl) {
  navigation.push('Detail', {detailUrl: detailUrl});
}

export function gotoTagPage(navigation, tagUrl) {
  navigation.push('Animes', {tagUrl: tagUrl});
}

export function gotoSearch(navigation) {
  navigation.push('Search');
}

export function gotoPlayer(navigation, playUrl) {
  navigation.navigate('Player', {originUrl: playUrl});
}

export function gotoWeb(navigation, webUrl) {
  navigation.navigate('Web', {label: webUrl});
}

export function gotoSetting(navigation) {
  navigation.navigate('Setting');
}
