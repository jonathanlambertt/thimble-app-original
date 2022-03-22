import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";

const UserInfoDisplay = ({ profilePhotoUrl, username, fullName }) => {
  return (
    <View style={styles.container}>
      {profilePhotoUrl ? (
        <Avatar
          containerStyle={styles.profilePhotoContainer}
          rounded
          icon={{ name: "user", type: "feather", color: "#333" }}
          size={55}
          source={{
            uri: profilePhotoUrl,
          }}
        />
      ) : (
        <Avatar
          containerStyle={styles.profilePhotoContainer}
          rounded
          icon={{ name: "user", type: "feather", color: "#333" }}
          size={55}
        />
      )}
      <View style={{ marginLeft: 12 }}>
        <Text style={styles.username}>{username}</Text>
        {fullName ? <Text style={styles.fullName}>{fullName}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
  username: {
    fontSize: 15,
    fontWeight: "500",
  },
  fullName: {
    marginTop: 1,
    color: "#9f9f9f",
    fontSize: 15,
  },
  profilePhotoContainer: {
    borderWidth: 0.5,
    borderColor: "#d3d3d3",
  },
});

export default UserInfoDisplay;
