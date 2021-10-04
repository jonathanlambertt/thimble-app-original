import React from "react";
import { View, StyleSheet, Text } from "react-native";
import AddFriendButton from "./AddFriendButton";
import { Avatar } from "react-native-elements";

const UserSearchResult = ({ result }) => {
  return (
    <View style={{ flexDirection: "row", marginTop: 15, marginLeft: 15 }}>
      {result.profile.profile_picture ? (
        <Avatar
          containerStyle={{
            borderWidth: 0.5,
            borderColor: "#d3d3d3",
          }}
          rounded
          icon={{ name: "user", type: "feather", color: "#333" }}
          size={55}
          source={{
            uri: result.profile.profile_picture,
          }}
        />
      ) : (
        <Avatar
          containerStyle={{
            borderWidth: 0.5,
            borderColor: "#d3d3d3",
          }}
          rounded
          icon={{ name: "user", type: "feather", color: "#333" }}
          size={55}
        />
      )}
      <View style={{ alignSelf: "center", marginLeft: 12 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          {result.profile.user}
        </Text>
        {result.profile.full_name ? (
          <Text
            style={{
              marginTop: 2,
              color: "#9f9f9f",
              fontSize: 14,
            }}
          >
            {result.profile.full_name}
          </Text>
        ) : null}
      </View>
      <View style={styles.cardEndContainer}>
        <AddFriendButton
          friendUUID={result.profile.uuid}
          friends={result.are_friends}
          pending={result.pending_friend_request}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 2,
    paddingLeft: 15,
    paddingVertical: 8,
  },
  cardEndContainer: {
    flex: 1,
    alignSelf: "center",
  },
});

export default UserSearchResult;
