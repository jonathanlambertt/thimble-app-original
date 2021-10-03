import React, { useState, useEffect } from "react";
import { FlatList, ActivityIndicator, Text, SafeAreaView } from "react-native";
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
    }, 250);

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <SearchBar
        value={query}
        onChangeText={(newQuery) => {
          setQuery(newQuery);
        }}
        placeholder="Search"
        lightTheme={true}
        inputContainerStyle={{ backgroundColor: "#dcdcdc" }}
        containerStyle={{
          backgroundColor: "#fff",
          borderTopWidth: 0,
        }}
        inputStyle={{ color: "#000" }}
        selectionColor="#909090"
        autoCapitalize="none"
        autoCorrect={false}
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
          }
        />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
