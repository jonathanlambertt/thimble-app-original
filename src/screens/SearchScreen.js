import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SearchBar } from "react-native-elements";
import UserSearchResult from "../components/UserSearchResult";
import thimbleApi from "../api/thimble";

const SearchScreen = ({ navigation }) => {
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
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  useEffect(() => {
    const clear = navigation.addListener("blur", () => {
      setQuery("");
      setDisplayText("");
      setResults([]);
    });

    return clear;
  }, [navigation]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          cancelButtonProps={{
            color: "#FF878A",
          }}
        />
        {isLoading ? (
          <ActivityIndicator style={{ marginTop: 10 }} size="large" />
        ) : results.length !== 0 ? (
          <FlatList
            data={results}
            keyExtractor={(result) => result.profile.uuid}
            renderItem={({ item }) => {
              return <UserSearchResult result={item} />;
            }}
          />
        ) : (
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              marginTop: 5,
              marginTop: 10,
            }}
          >
            {displayText}
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
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
    //borderBottomColor: "#d3d3d3",
    //borderBottomWidth: 1,
  },
});

export default SearchScreen;
