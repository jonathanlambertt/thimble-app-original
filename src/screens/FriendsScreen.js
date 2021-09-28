import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import thimbleApi from "../api/thimble";
import UserDisplay from "../components/UserDisplay";

const FriendsScreen = () => {
  const [friends, setFriends] = useState([]);

  const fetchFriends = async () => {
    try {
      const response = await thimbleApi.get("u/friends");
      setFriends(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        keyExtractor={(result) => result.uuid}
        renderItem={({ item }) => {
          return <UserDisplay result={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default FriendsScreen;