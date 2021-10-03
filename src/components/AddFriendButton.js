import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import thimbleApi from "../api/thimble";

const AddFriendButton = ({ friendUUID, friends, pending }) => {
  const [pressed, setPressed] = useState(false);
  const [disable, setDisable] = useState(false);

  const sendFriendRequest = async () => {
    setDisable(true);
    try {
      await thimbleApi.post("n/send", {
        recipient_uuid: friendUUID,
        notification_type: 1,
        text: "",
      });
      setPressed(true);
    } catch (error) {}
  };

  return (
    <View>
      {friends ? null : pending ? (
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
              <Ionicons name="person-add-outline" size={23} color="#fff" />
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
    backgroundColor: "#a3ceff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 15,
  },
  pending: {
    alignSelf: "flex-end",
    marginRight: 10,
    fontWeight: "bold",
    color: "#a3ceff",
    fontSize: 15,
  },
});

export default AddFriendButton;
