import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
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
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={results}
        keyExtractor={(result) => result.uuid}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("GroupDetail", { group: item })
              }
            >
              <Group result={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CreatedGroupsScreen;
