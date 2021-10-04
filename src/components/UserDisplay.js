import React from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import RemoveFriendButton from "./RemoveFriendButton";

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
        <Text style={{ fontSize: 15, fontWeight: "500" }}>{result.user}</Text>
        {result.full_name ? (
          <Text style={{ marginTop: 2, color: "#9f9f9f", fontSize: 14 }}>
            {result.full_name}
          </Text>
        ) : null}
      </View>
      <RemoveFriendButton result={result} />
    </View>
  );
};

export default UserDisplay;
