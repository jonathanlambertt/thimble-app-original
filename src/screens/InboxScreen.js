import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Notification from "../components/Notification";
import thimbleApi from "../api/thimble";

const InboxScreen = () => {
  const [results, setResults] = useState([]);

  React.useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await thimbleApi.get("n/inbox");
        setResults(response.data);
      } catch (error) {}
    };

    fetchNotifications();
  }, []);

  const deleteFriendRequest = async (notif_uuid) => {
    setResults(results.filter((item) => item.uuid !== notif_uuid));
    try {
      await thimbleApi.delete("n/friend-request", {
        data: { notification_uuid: notif_uuid },
      });
    } catch (error) {}
  };

  const acceptFriendRequest = async (notif_uuid) => {
    setResults(results.filter((item) => item.uuid !== notif_uuid));
    try {
      await thimbleApi.put("n/friend-request", {
        notification_uuid: notif_uuid,
      });
    } catch (error) {}
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={results}
        keyExtractor={(result) => result.uuid}
        renderItem={({ item }) => {
          return (
            <Notification
              acceptRequest={acceptFriendRequest}
              deleteRequest={deleteFriendRequest}
              result={item}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default InboxScreen;
