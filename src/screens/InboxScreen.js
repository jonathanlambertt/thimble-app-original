import React, { useState, useEffect } from "react";
import { View, FlatList, Text, ActivityIndicator } from "react-native";
import Notification from "../components/Notification";
import thimbleApi from "../api/thimble";

const InboxScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const response = await thimbleApi.get("n/inbox");
        setResults(response.data);
        setIsLoading(false);
      } catch (error) {}
    };

    fetchNotifications();
  }, []);

  const handleFriendRequest = async (notifUUID, accept) => {
    setResults(results.filter((item) => item.uuid !== notifUUID));
    if (accept) {
      try {
        await thimbleApi.put(`n/friend-request/${notifUUID}`);
      } catch (error) {}
    } else {
      try {
        await thimbleApi.delete(`n/friend-request/${notifUUID}`);
      } catch (error) {}
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 10 }} size="large" />
      ) : results.length !== 0 ? (
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
      ) : (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Text style={{ fontSize: 20, fontWeight: "500" }}>
            Your inbox is currently empty.
          </Text>
        </View>
      )}
    </View>
  );
};

export default InboxScreen;
