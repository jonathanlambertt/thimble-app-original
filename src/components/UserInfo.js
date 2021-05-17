import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PhotoThumbnail from "../components/PhotoThumbnail";

const UserInfo = ({ uri, username, fullname }) => {
  return (
    <View style={styles.container}>
      <PhotoThumbnail uri={uri} width={50} height={50} />
      <View style={styles.userTextContainer}>
        <Text style={styles.username}>{username}</Text>
        {fullname ? <Text style={styles.fullName}>{fullname}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
  },
  userTextContainer: {
    alignSelf: "center",
    marginLeft: 11,
  },
  username: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 1,
  },
  fullName: {
    fontSize: 13,
    fontWeight: "500",
    color: "#9f9f9f",
  },
});

export default UserInfo;
