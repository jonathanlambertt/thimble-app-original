import React, { useState, useEffect, useContext } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  RefreshControl,
} from "react-native";
import thimbleApi from "../api/thimble";
import Group from "../components/Group";
import { Context as GroupContext } from "../context/GroupContext";

const JoinedGroupsScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [results, setResults] = useState([]);
  const { setGroup } = useContext(GroupContext);

  const fetchInitialGroups = async () => {
    setIsLoading(true);
    try {
      const response = await thimbleApi.get("g/joined");
      setResults(response.data);
      setIsLoading(false);
    } catch (error) {}
  };

  const fetchGroups = async () => {
    try {
      const response = await thimbleApi.get("g/joined");
      setResults(response.data);
      setRefreshing(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchInitialGroups();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchGroups();
  }, []);

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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
            When friends add you to a group they will show up here.
          </Text>
        </View>
      )}
    </View>
  );
};

export default JoinedGroupsScreen;
