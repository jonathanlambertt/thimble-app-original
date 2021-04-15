import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import thimbleApi from "../api/thimble";

const AddFriendButton = ({ resultUUID }) => {
  const [pressed, setPressed] = useState(false);

  const sendFriendRequest = async () => {
    try {
      await thimbleApi.post("n/friend-request", {
        recipient_uuid: resultUUID,
        notification_type: 1,
        text: "",
      });
      setPressed(true);
    } catch (error) {}
  };

  return (
    <View>
      {pressed ? (
        <Text style={styles.pending}>
          Sent <FontAwesome name="check" size={17} />
        </Text>
      ) : (
        <TouchableOpacity
          style={styles.addFriendButton}
          onPress={() => {
            sendFriendRequest();
          }}
        >
          <Ionicons name="person-add-outline" size={25} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  addFriendButton: {
    alignSelf: "flex-end",
    borderRadius: 3,
    backgroundColor: "#FF878A",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  pending: {
    alignSelf: "flex-end",
    marginRight: 10,
    fontWeight: "bold",
    color: "#FF878A",
    fontSize: 15,
  },
});

export default AddFriendButton;
