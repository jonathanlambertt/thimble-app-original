import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import thimbleApi from "../api/thimble";
import Group from "../components/Group";

const CreatedGroupsScreen = ({ navigation }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchGroups = navigation.addListener("focus", async () => {
      try {
        const response = await thimbleApi.get("g/created");
        setResults(response.data);
      } catch (error) {}
    });

    return fetchGroups;
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={results}
        keyExtractor={(result) => result.uuid}
        renderItem={({ item }) => {
          return <Group result={item} />;
        }}
      />
    </View>
  );
};

export default CreatedGroupsScreen;
