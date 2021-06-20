import React, { useState, useEffect, useContext } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import thimbleApi from "../api/thimble";
import Group from "../components/Group";
import { Context as GroupContext } from "../context/GroupContext";

const JoinedGroupsScreen = ({ navigation }) => {
  const [results, setResults] = useState([]);
  const { setGroup } = useContext(GroupContext);

  useEffect(() => {
    const fetchGroups = navigation.addListener("focus", async () => {
      try {
        const response = await thimbleApi.get("g/joined");
        setResults(response.data);
      } catch (error) {}
    });

    return fetchGroups;
  }, [navigation]);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={results}
        keyExtractor={(result) => result.group.uuid}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setGroup({ group: item });
                navigation.navigate("GroupDetail", { group: item });
              }}
            >
              <Group result={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default JoinedGroupsScreen;
