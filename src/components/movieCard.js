import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const MovieCard = ({item}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('MovieDetails', {movieId: item.id})}
      style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={styles.yearContainer}>
          <Text style={styles.year}>{item.year}</Text>
        </View>
      </View>
      <View style={styles.plotContainer}>
        <Text numberOfLines={3} style={styles.plot}>
          {item.plot}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width / 1.07,
    height: width / 2.9,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: '1.5%',
    padding: '3%',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: '2%',
  },
  titleContainer: {
    width: '80%',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  yearContainer: {
    width: '20%',
    alignItems: 'flex-end',
  },
  year: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
  },
  plotContainer: {
    width: '100%',
  },
  plot: {
    fontSize: 14,
    fontWeight: '400',
    color: '#333',
  },
});

export default MovieCard;
