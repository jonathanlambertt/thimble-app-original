import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SearchBar } from "react-native-elements";
import thimbleApi from "../api/thimble";

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const search = async (query) => {
    if (query) {
      const response = await thimbleApi.get(`/u/search/${query}`);
      setResults(response.data);
    }
  };

  return (
    <View>
      <SearchBar
        value={query}
        onChangeText={(newQuery) => {
          setQuery(newQuery);
          search(newQuery);
        }}
        platform="ios"
        placeholder="Search for friends"
        cancelButtonTitle="Cancel"
        containerStyle={styles.searchContainerStyle}
      />
      <Text>{results}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainerStyle: {
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default SearchScreen;
