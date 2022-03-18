import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  Platform,
  RefreshControl,
} from "react-native";
import thimbleApi from "../../api/thimble";
import Post from "../../components/Post";
import Post2 from "../../components/Post2";
import * as Notifications from "expo-notifications";
import FormData from "form-data";
import * as Device from 'expo-device';

const FeedScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    registerForPushNotifications();
    fetchInitialFeed();
  }, []);

  const fetchInitialFeed = async () => {
    setIsLoading(true);
    try {
      const response = await thimbleApi.get("u/feed");
      setPosts(response.data);
      setIsLoading(false);
    } catch (error) {}
  };

  const fetchFeed = async () => {
    try {
      const response = await thimbleApi.get("u/feed");
      setPosts(response.data);
      setRefreshing(false);
    } catch (error) {}
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchFeed();
  }, []);

  const loadMore = async () => {
    try {
      const response = await thimbleApi.get(
        `u/feed/${posts[posts.length - 1].post.uuid}`
      );
      setPosts([...posts, ...response.data]);
    } catch (error) {}
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fafafa" }}>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 20 }} size="large" />
      ) : (
        <FlatList
          contentContainerStyle={{ paddingTop: 8 }}
          showsVerticalScrollIndicator={false}
          data={posts}
          keyExtractor={(post) => post.post.uuid}
          renderItem={({ item }) => {
            return <Post2 post={item} />;
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={2}
          ListEmptyComponent={
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: "500",
                marginHorizontal: 10,
                lineHeight: 25,
                marginTop: 50,
              }}
            >
              This is your main feed. Posts from groups you're a part of will be
              shown here.
            </Text>
          }
        />
      )}
    </View>
  );
};

async function registerForPushNotifications() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;

    let data = new FormData();
    data.append("notification_token", token);

    try {
      await thimbleApi.put("u/edit", data);
    } catch (error) {}
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const styles = StyleSheet.create({});

export default FeedScreen;
