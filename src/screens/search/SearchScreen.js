import React, { useState, useEffect } from "react";
import {
  FlatList,
  ActivityIndicator,
  Text,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { SearchBar } from "react-native-elements";
import UserSearchResult from "../../components/UserSearchResult";
import thimbleApi from "../../api/thimble";

const SearchScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const search = async () => {
    setIsLoading(true);
    try {
      const response = await thimbleApi.get(`u/search/${query}`);
      setResults(response.data);

      if (response.data.length == 0) {
        setDisplayText("No results found.");
      } else {
        setDisplayText("");
      }

      setIsLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query && query.trim() != "") {
        search();
      } else {
        setResults([]);
        setDisplayText("");
      }
    }, 250);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <SearchBar
        value={query}
        onChangeText={(newQuery) => {
          setQuery(newQuery);
        }}
        platform="ios"
        placeholder="Search"
        lightTheme={true}
        inputContainerStyle={{ backgroundColor: "#e9e9e9" }}
        containerStyle={{
          backgroundColor: "#fff",
          borderTopWidth: 0,
        }}
        inputStyle={{ color: "#000" }}
        selectionColor="#ff878a"
        autoCapitalize="none"
        autoCorrect={false}
        round
        cancelButtonTitle="Cancel"
        cancelButtonProps={{
          color: "#ff878a",
        }}
      />
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 10 }} size="large" />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(result) => result.profile.uuid}
          renderItem={({ item }) => {
            return <UserSearchResult result={item} />;
          }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>{displayText}</Text>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 5,
    marginTop: 10,
  },
});

export default SearchScreen;
