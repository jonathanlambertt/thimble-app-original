import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";

const UserDisplay = ({ result }) => {
  return (
    <View style={{ flexDirection: "row", marginTop: 15, marginLeft: 15 }}>
      {result.profile_picture ? (
        <Avatar
          containerStyle={{
            borderWidth: 0.5,
            borderColor: "#d3d3d3",
          }}
          rounded
          icon={{ name: "user", type: "feather", color: "#333" }}
          size={55}
          source={{
            uri: result.profile_picture,
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
        <Text style={{ fontSize: 16, fontWeight: "500" }}>{result.user}</Text>
        {result.full_name ? (
          <Text style={{ marginTop: 3, color: "#9f9f9f", fontSize: 13 }}>
            {result.full_name}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default UserDisplay;
