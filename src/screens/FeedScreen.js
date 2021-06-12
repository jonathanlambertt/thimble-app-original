import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import thimbleApi from "../api/thimble";
import Post from "../components/Post";

const FeedScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchFeed();
  }, []);

  useEffect(() => {
    const callFetchFeed = navigation.addListener("focus", async () => {
      fetchFeed();
    });

    return callFetchFeed;
  }, [navigation]);

  const fetchFeed = async () => {
    try {
      const response = await thimbleApi.get("u/feed");
      setPosts(response.data);
    } catch (error) {}
  };

  return (
    <View>
      <FlatList
        data={posts}
        keyExtractor={(post) => post.uuid}
        renderItem={({ item }) => {
          return <Post post={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default FeedScreen;
