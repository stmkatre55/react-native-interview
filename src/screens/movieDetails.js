import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import axios from 'axios';
import BackIcon from 'react-native-vector-icons/Ionicons';

const MovieDetails = ({route, navigation}) => {
  const {movieId} = route.params; // Get the movieId passed from the Movies screen
  const {width, height} = useWindowDimensions(); // Get the current window dimensions
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMovieDetails = async id => {
    try {
      const response = await axios.get(
        `https://freetestapi.com/api/v1/movies/${id}`,
      );
      if (response.status === 200) {
        setMovieDetails(response.data);
      } else {
        console.log('Something went wrong!');
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieDetails(movieId);
  }, [movieId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!movieDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text>Movie details not available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackIcon
          name="arrow-back-outline"
          size={24}
          color="#000"
          onPress={() => navigation.goBack()} // Navigate back
        />
        <Text style={styles.headerTitle}>Movie Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Movie Poster */}
        <Image
          source={{uri: movieDetails.poster}}
          style={[styles.poster, {width: width - 32, height: width}]}
          resizeMode="cover"
        />

        {/* Movie Title */}
        <Text style={styles.title}>{movieDetails.title}</Text>

        {/* Overview */}
        <Text style={styles.overview}>{movieDetails.plot}</Text>

        {/* Movie Information */}
        <Text style={styles.sectionTitle}>Movie Information</Text>
        <Text style={styles.label}>Release Year: {movieDetails.year}</Text>
        <Text style={styles.label}>Rating: {movieDetails.rating}</Text>
        <Text style={styles.label}>Genre: {movieDetails.genre}</Text>
        <Text style={styles.label}>Director: {movieDetails.director}</Text>
        <Text style={styles.label}>Actors: {movieDetails.actors}</Text>
        <Text style={styles.label}>Awards: {movieDetails.awards}</Text>
        <Text style={styles.label}>Country: {movieDetails.country}</Text>
        <Text style={styles.label}>Language: {movieDetails.language}</Text>
        <Text style={styles.label}>Box Office: {movieDetails.boxOffice}</Text>
        <Text style={styles.label}>Production: {movieDetails.production}</Text>
        <Text style={styles.label}>Website: {movieDetails.website}</Text>
        <View style={styles.footerSpacing} />
      </ScrollView>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    elevation: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginLeft: 16,
  },
  scrollContainer: {
    padding: 16,
  },
  poster: {
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginTop: 16,
    marginBottom: 8,
  },
  overview: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginBottom: 16,
  },
  footerSpacing: {
    height: 16,
  },
});
