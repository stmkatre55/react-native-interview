import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainNavigator from './src/navigation/mainNavigator';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <MainNavigator />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
