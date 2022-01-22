import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import thimbleApi from "../api/thimble";

const AddFriendButton = ({ friendID, areFriends, isPending }) => {
  const [pressed, setPressed] = useState(false);
  const [disable, setDisable] = useState(false);

  const sendFriendRequest = async () => {
    setDisable(true);
    try {
      await thimbleApi.post("n/send", {
        recipient_uuid: friendID,
        notification_type: 1,
        text: "",
      });
      setPressed(true);
    } catch (error) {}
  };

  return (
    <View>
      {areFriends ? null : isPending ? (
        <Text style={styles.pending}>Pending</Text>
      ) : (
        <View>
          {pressed ? (
            <Text style={styles.pending}>
              Sent <FontAwesome name="check" size={17} />
            </Text>
          ) : (
            <TouchableOpacity
              disabled={disable}
              style={styles.addFriendButton}
              onPress={() => {
                sendFriendRequest();
              }}
            >
              <Feather name="user-plus" size={23} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  addFriendButton: {
    alignSelf: "flex-end",
    borderRadius: 3,
    backgroundColor: "#ff878a",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  pending: {
    alignSelf: "flex-end",
    fontWeight: "bold",
    color: "#ff878a",
    fontSize: 15,
  },
});

export default AddFriendButton;
