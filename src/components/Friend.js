import React from "react";
import { View, StyleSheet } from "react-native";
import UserInfoDisplay from "../components/UserInfoDisplay";
import RemoveFriendButton from "./RemoveFriendButton";

const Friend = ({ result }) => {
  return (
    <View style={styles.container}>
      <UserInfoDisplay
        profilePhotoUrl={result.profile_picture}
        username={result.user}
        fullName={result.full_name}
      />
      <RemoveFriendButton friendID={result.uuid} username={result.user} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 15,
    marginLeft: 20,
  },
});

export default Friend;
