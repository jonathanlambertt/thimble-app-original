import React, { useState, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, FlatList, Text } from "react-native";
import thimbleApi from "../api/thimble";
import UserInfo from "../components/UserInfo";
import { Context as GroupContext } from "../context/GroupContext";

const GroupMembersScreen = () => {
  const [results, setResults] = useState([]);
  const { state } = useContext(GroupContext);

  useFocusEffect(
    React.useCallback(() => {
      const fetchMembers = async () => {
        try {
          const response = await thimbleApi.get(
            `g/${state.group.group.uuid}/members/all`
          );
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
              {item.profile_picture ? (
                <UserInfo
                  uri={item.profile_picture}
                  username={item.user}
                  fullname={item.full_name}
                />
              ) : (
                <UserInfo username={item.user} fullname={item.full_name} />
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export default GroupMembersScreen;
