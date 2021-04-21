import React from "react";
import { View, StyleSheet } from "react-native";
import FriendRequest from "../components/FriendRequest";

const Notification = ({ result, handleFriendRequest }) => {
  return (
    <View style={{ marginTop: 7 }}>
      {result.notification_type === 1 ? (
        <FriendRequest
          result={result}
          handleFriendRequest={handleFriendRequest}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Notification;
