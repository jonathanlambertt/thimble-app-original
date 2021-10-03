import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
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
            Invite some friends to Thimble!
          </Text>
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
});

export default FriendsScreen;
