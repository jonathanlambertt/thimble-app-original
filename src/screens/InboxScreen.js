import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import Notification from "../components/Notification";
import thimbleApi from "../api/thimble";

const InboxScreen = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await thimbleApi.get("n/inbox");
        setResults(response.data);
      } catch (error) {}
    };

    fetchNotifications();
  }, []);

  const handleFriendRequest = async (notifUUID, accept) => {
    setResults(results.filter((item) => item.uuid !== notifUUID));
    if (accept) {
      try {
        await thimbleApi.put("n/friend-request", {
          notification_uuid: notifUUID,
        });
      } catch (error) {}
    } else {
      try {
        await thimbleApi.delete("n/friend-request", {
          data: { notification_uuid: notifUUID },
        });
      } catch (error) {}
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={results}
        keyExtractor={(result) => result.uuid}
        renderItem={({ item }) => {
          return (
            <Notification
              handleFriendRequest={handleFriendRequest}
              result={item}
            />
          );
        }}
      />
    </View>
  );
};

export default InboxScreen;
