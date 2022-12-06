import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Animated, Text} from 'react-native';

const ExpandableView = ({expanded = false}) => {
  const [height] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(height, {
      toValue: !expanded ? 200 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [expanded, height]);

  // console.log('rerendered');

  return <Animated.View style={{height, backgroundColor: 'orange'}} />;
};
