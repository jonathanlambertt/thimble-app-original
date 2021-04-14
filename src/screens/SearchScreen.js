import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
import UserCard from "../components/UserCard";
import thimbleApi from "../api/thimble";

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  React.useEffect(() => {
    if (query && query.trim() != "") {
      setTimeout(async () => {
        try {
          const response = await thimbleApi.get(`u/search/${query}`);
          setResults(response.data);
        } catch (error) {}
      }, 100);
    } else {
      setResults([]);
    }
  }, [query]);

  React.useEffect(() => {
    const clearError = navigation.addListener("blur", () => {
      setQuery("");
      setResults([]);
    });

    return clearError;
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SearchBar
        value={query}
        onChangeText={(newQuery) => {
          setQuery(newQuery);
        }}
        platform="ios"
        placeholder="Search for friends"
        cancelButtonTitle="Cancel"
        containerStyle={styles.searchContainerStyle}
        autoCapitalize="none"
        autoCorrect={false}
        onCancel={() => setResults([])}
      />
      <FlatList
        data={results}
        keyExtractor={(result) => result.profile.uuid}
        renderItem={({ item }) => {
          return <UserCard result={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainerStyle: {
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
  },
});

export default SearchScreen;
