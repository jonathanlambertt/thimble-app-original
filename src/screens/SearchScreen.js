import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
import UserSearchResult from "../components/UserSearchResult";
import thimbleApi from "../api/thimble";

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const search = async () => {
    try {
      const response = await thimbleApi.get(`u/search/${query}`);
      setResults(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query && query.trim() != "") {
        search();
      } else {
        setResults([]);
      }
    }, 150);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  useEffect(() => {
    const clear = navigation.addListener("blur", () => {
      setQuery("");
      setResults([]);
    });

    return clear;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <SearchBar
        value={query}
        onChangeText={(newQuery) => {
          setQuery(newQuery);
        }}
        platform="ios"
        placeholder="Search for friends"
        cancelButtonTitle="Cancel"
        containerStyle={styles.searchContainer}
        autoCapitalize="none"
        autoCorrect={false}
        onCancel={() => setResults([])}
      />
      <FlatList
        data={results}
        keyExtractor={(result) => result.profile.uuid}
        renderItem={({ item }) => {
          return <UserSearchResult result={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
  },
});

export default SearchScreen;
