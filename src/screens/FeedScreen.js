import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import thimbleApi from "../api/thimble";
import Post from "../components/Post";

const FeedScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    try {
      const response = await thimbleApi.get("u/feed");
      setPosts(response.data);
      setIsLoading(false);
    } catch (error) {}
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 20 }} size="large" />
      ) : posts.length !== 0 ? (
        <FlatList
          data={posts}
          keyExtractor={(post) => post.uuid}
          renderItem={({ item }) => {
            return <Post post={item} />;
          }}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "500",
              marginHorizontal: 10,
              lineHeight: 25,
            }}
          >
            This is your main feed. Posts from groups you're a part of will be
            shown here.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default FeedScreen;
