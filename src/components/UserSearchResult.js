import React from "react";
import { View, StyleSheet } from "react-native";
import AddFriendButton from "./AddFriendButton";
import UserInfo from "./UserInfo";

const UserSearchResult = ({ result }) => {
  return (
    <View style={styles.container}>
      <UserInfo
        uri={result.profile.profile_picture}
        username={result.profile.user}
        fullname={result.profile.full_name}
      />
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
