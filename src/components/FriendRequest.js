import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-elements";
import PhotoThumbnail from "../components/PhotoThumbnail";

const FriendRequest = ({ result, handleFriendRequest }) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <PhotoThumbnail
          uri={result.sender.profile_picture}
          width={50}
          height={50}
        />
        <View style={styles.userTextContainer}>
          <Text style={{ flex: 1, flexWrap: "wrap" }}>
            <Text style={styles.username}>{result.sender.user}</Text>
            <Text style={{ fontSize: 14 }}> sent you a friend request. </Text>
            <Text style={{ color: "#9f9f9f" }}>{result.timestamp}</Text>
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Button
          buttonStyle={styles.confirmButton}
          titleStyle={{ fontSize: 13, fontWeight: "bold" }}
          title="Confirm"
          onPress={() => handleFriendRequest(result.uuid, true)}
        />
        <Button
          buttonStyle={{ backgroundColor: "#ff878a", paddingVertical: 5 }}
          titleStyle={{ fontSize: 13, fontWeight: "bold" }}
          title="Delete"
          onPress={() => handleFriendRequest(result.uuid, false)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginHorizontal: 7,
    paddingBottom: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#d3d3d3",
  },
  userInfoContainer: {
    flexDirection: "row",
    flex: 1,
    paddingLeft: 10,
    paddingVertical: 10,
  },
  userTextContainer: {
    alignSelf: "center",
    marginLeft: 10,
    flexShrink: 1,
    flexDirection: "row",
  },
  username: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 1,
  },
  confirmButton: {
    backgroundColor: "#a3ceff",
    paddingVertical: 5,
    marginHorizontal: 10,
  },
});

export default FriendRequest;
