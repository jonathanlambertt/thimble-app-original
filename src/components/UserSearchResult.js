import React from "react";
import { View, StyleSheet } from "react-native";
import AddFriendButton from "./AddFriendButton";
import UserInfoDisplay from "./UserInfoDisplay";

const UserSearchResult = ({ result }) => {
  return (
    <View style={styles.container}>
      <UserInfoDisplay
        profilePhotoUrl={result.profile.profile_picture}
        username={result.profile.user}
        fullName={result.profile.full_name}
      />
      <View style={styles.cardEndContainer}>
        <AddFriendButton
          friendID={result.profile.uuid}
          areFriends={result.are_friends}
          isPending={result.pending_friend_request}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 15,
    marginLeft: 20,
  },
  cardEndContainer: {
    flex: 1,
    alignSelf: "center",
    marginRight: 20,
  },
});

export default UserSearchResult;
