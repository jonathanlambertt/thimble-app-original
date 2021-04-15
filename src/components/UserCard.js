import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AddFriendButton from "./AddFriendButton";

const UserCard = ({ result }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.profilePicture}
        source={{ uri: result.profile.profile_picture }}
      />
      <View style={styles.userContainer}>
        <Text style={styles.username}>{result.profile.user}</Text>
        {result.profile.full_name ? (
          <Text style={styles.fullName}>{result.profile.full_name}</Text>
        ) : null}
      </View>
      <View style={styles.cardEndContainer}>
        {result.are_friends ? null : result.pending_friend_request ? (
          <Text style={styles.pending}>Pending</Text>
        ) : (
          <AddFriendButton resultUUID={result.profile.uuid} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    paddingLeft: 10,
    paddingVertical: 10,
  },
  profilePicture: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    borderWidth: 1,
    borderColor: "#d3d3d3",
  },
  userContainer: {
    alignSelf: "center",
    marginLeft: 13,
  },
  username: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 1,
  },
  fullName: {
    fontSize: 15,
    color: "#9f9f9f",
  },
  cardEndContainer: {
    flex: 1,
    alignSelf: "center",
  },
  pending: {
    alignSelf: "flex-end",
    marginRight: 10,
    fontWeight: "bold",
    color: "#FF878A",
    fontSize: 15,
  },
});

export default UserCard;
