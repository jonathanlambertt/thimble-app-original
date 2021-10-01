import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import thimbleApi from "../api/thimble";

const RemoveFriendButton = ({ result }) => {
  const [disable, setDisable] = useState(false);
  const [removed, setRemoved] = useState(false);

  const displayAlert = () =>
    Alert.alert("Warning", `Remove ${result.user} as a friend?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Remove",
        onPress: () => removeFriend(),
        style: "destructive",
      },
    ]);

  const removeFriend = async () => {
    setDisable(true);
    try {
      await thimbleApi.put(`u/remove/${result.uuid}`);
      setRemoved(true);
    } catch (error) {}
  };
  return (
    <View style={{ flex: 1, alignSelf: "center" }}>
      {removed ? (
        <View style={{ alignSelf: "flex-end", marginRight: 15 }}>
          <Text style={{ fontWeight: "600" }}>Removed</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            backgroundColor: "#FF878A",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 3,
            marginRight: 15,
          }}
          onPress={() => displayAlert()}
          disabled={disable}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>Remove</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RemoveFriendButton;
