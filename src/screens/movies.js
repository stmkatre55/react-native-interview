import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import axios from 'axios';
import MovieCard from '../components/movieCard';
import SearchIcon from 'react-native-vector-icons/Ionicons';

// Disable LogBox warnings for debugging
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [numColumns, setNumColumns] = useState(1);
  const {width} = useWindowDimensions();

  const debounceTimeout = 500;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, debounceTimeout);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const getMovies = async (
    pageNum = 1,
    searchQuery = '',
    isRefreshing = false,
  ) => {
    if (loading) return;
    setLoading(true);

    const options = {
      method: 'GET',
      url: searchQuery
        ? `https://freetestapi.com/api/v1/movies?search=${searchQuery}&page=${pageNum}`
        : `https://freetestapi.com/api/v1/movies?page=${pageNum}`,
      headers: {
        accept: 'application/json',
      },
    };

    try {
      const response = await axios.request(options);
      if (response.status === 200) {
        const newMovies = response.data;
        if (isRefreshing || searchQuery) {
          setMovies(newMovies);
        } else {
          setMovies(prevMovies => [...prevMovies, ...newMovies]);
        }
      } else {
        console.log('Something went wrong..!');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setPage(1);
    getMovies(1, debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    await getMovies(1, debouncedSearchQuery, true);
  };

  const loadMoreMovies = async () => {
    if (!debouncedSearchQuery) {
      setPage(prevPage => prevPage + 1);
      await getMovies(page + 1);
    }
  };

  const handleSearch = query => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const updateLayout = () => {
      const {width, height} = Dimensions.get('window');
      const newOrientation = width > height ? 'landscape' : 'portrait';
      setNumColumns(newOrientation === 'landscape' ? 2 : 1);
    };

    const subscription = Dimensions.addEventListener('change', updateLayout);

    // Set initial columns based on current orientation
    updateLayout();

    return () => {
      if (subscription?.remove) {
        subscription.remove(); // Remove event listener
      }
    };
  }, []);

  return (
    <View style={styles(width).container}>
      <View style={styles(width).header}>
        <Text style={styles(width).headerText}>Movies</Text>
      </View>

      <FlatList
        ListHeaderComponent={
          <View style={styles(width).searchContainer}>
            <View style={styles(width).inputContainer}>
              <TextInput
                style={styles(width).searchInput}
                placeholder="Search by movie title"
                value={searchQuery}
                onChangeText={handleSearch}
              />
              <SearchIcon
                name="search"
                size={24}
                color={'#333'}
                style={{width: '10%'}}
              />
            </View>
          </View>
        }
        data={movies}
        renderItem={({item}) => <MovieCard item={item} />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && <ActivityIndicator size="large" color="#EC6380" />
        }
        key={numColumns} // Unique key based on numColumns
        contentContainerStyle={styles(width).flatListContent} // Apply content container styles
        columnWrapperStyle={
          numColumns > 1 ? styles(width).columnWrapper : undefined
        } // Apply column wrapper styles for spacing
      />
    </View>
  );
};

const styles = width =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#8788E3',
    },
    header: {
      width: width,
      height: 56,
      justifyContent: 'center',
      paddingHorizontal: '3%',
      backgroundColor: '#FFF',
      elevation: 4,
    },
    headerText: {
      fontSize: 18,
      fontWeight: '700',
      color: '#000',
    },
    searchContainer: {
      width: '100%',
      paddingHorizontal: '1.5%',
      paddingVertical: '3%',
    },
    inputContainer: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      marginTop: 10,
      borderRadius: 5,
      backgroundColor: '#f9f9f9',
    },
    searchInput: {
      padding: 8,
      width: '90%',
      borderRadius:5,
      backgroundColor: '#f9f9f9',
    },
    flatListContent: {
      paddingHorizontal: '2%', // Add horizontal padding to the FlatList
    },
    columnWrapper: {
      justifyContent: 'space-around', // Distribute space between columns
    },
  });

export default Movies;
