import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, FlatList } from "react-native";
import thimbleApi from "../api/thimble";
import UserInfo from "../components/UserInfo";

const GroupMembersScreen = ({ group }) => {
  const [results, setResults] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      const fetchMembers = async () => {
        try {
          const response = await thimbleApi.get(`g/${group.uuid}/members`);
          setResults(response.data);
        } catch (e) {}
      };

      fetchMembers();

      return () => {};
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={results}
        keyExtractor={(result) => result.uuid}
        renderItem={({ item }) => {
          return (
            <View style={{ marginTop: 2, paddingLeft: 15, paddingVertical: 8 }}>
              <UserInfo
                uri={item.profile_picture}
                username={item.user}
                fullname={item.full_name}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default GroupMembersScreen;
