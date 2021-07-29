import React, { useState, useContext, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
} from "react-native";
import { Context as GroupContext } from "../context/GroupContext";
import thimbleApi from "../api/thimble";
import Post from "../components/Post";

const GroupPostsScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const { state } = useContext(GroupContext);

  useEffect(() => {
    fetchInitialPosts();
  }, []);

  const fetchInitialPosts = async () => {
    setIsLoading(true);
    try {
      const response = await thimbleApi.get(
        `g/${state.group.group.uuid}/posts`
      );
      setResults(response.data);
      setIsLoading(false);
    } catch (error) {}
  };

  const fetchPosts = async () => {
    try {
      const response = await thimbleApi.get(
        `g/${state.group.group.uuid}/posts`
      );
      setResults(response.data);
      setRefreshing(false);
    } catch (error) {}
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchPosts();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 10 }} size="large" />
      ) : results.length !== 0 ? (
        <FlatList
          data={results}
          keyExtractor={(result) => result.post.uuid}
          renderItem={({ item }) => {
            return <Post post={item} />;
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
