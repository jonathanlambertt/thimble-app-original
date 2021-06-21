import React, { useState, useContext } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Context as GroupContext } from "../context/GroupContext";
import thimbleApi from "../api/thimble";
import Post from "../components/Post";

const GroupPostsScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const { state } = useContext(GroupContext);

  useFocusEffect(
    React.useCallback(() => {
      const fetchPosts = async () => {
        setIsLoading(true);
        try {
          const response = await thimbleApi.get(
            `g/${state.group.group.uuid}/posts`
          );
          setResults(response.data);
          setIsLoading(false);
        } catch (error) {}
      };

      fetchPosts();

      return () => {};
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 10 }} size="large" />
      ) : results.length !== 0 ? (
        <FlatList
          data={results}
          keyExtractor={(result) => result.uuid}
          renderItem={({ item }) => {
            return <Post post={item} />;
          }}
        />
      ) : (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Text style={{ fontSize: 20, fontWeight: "500" }}>
            Be the first to post in this group.
          </Text>
        </View>
      )}
    </View>
  );
};

export default GroupPostsScreen;
