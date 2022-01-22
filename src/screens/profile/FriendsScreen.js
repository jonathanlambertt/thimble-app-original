import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import thimbleApi from "../../api/thimble";
import Friend from "../../components/Friend";

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
          return <Friend result={item} />;
        }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Invite some friends to Thimble!</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    marginHorizontal: 10,
    lineHeight: 25,
    marginTop: 50,
  },
});

export default FriendsScreen;
