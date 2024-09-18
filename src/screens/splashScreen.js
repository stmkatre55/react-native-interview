import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Movies');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/splash.webp')} style={styles.image} />
      <Text style={styles.text}>Welcome to Movies world...!</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginTop: -30,
  },
  image: {
    width: 300,
    height: 300,
  },
});
