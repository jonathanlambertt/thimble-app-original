import React, { useState, useEffect, useContext } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from "react-native";
import thimbleApi from "../api/thimble";
import Group from "../components/Group";
import { Context as GroupContext } from "../context/GroupContext";

const CreatedGroupsScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const { setGroup } = useContext(GroupContext);

  useEffect(() => {
    const fetchGroups = navigation.addListener("focus", async () => {
      setIsLoading(true);
      try {
        const response = await thimbleApi.get("g/created");
        setResults(response.data);
        setIsLoading(false);
      } catch (error) {}
    });

    return fetchGroups;
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 10 }} size="large" />
      ) : results.length !== 0 ? (
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
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              marginHorizontal: 10,
              fontWeight: "500",
            }}
          >
            Press the plus at the top to create your first group!
          </Text>
        </View>
      )}
    </View>
  );
};

export default CreatedGroupsScreen;
