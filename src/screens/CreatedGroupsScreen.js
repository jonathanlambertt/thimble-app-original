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
import { useFocusEffect } from "@react-navigation/native";

const CreatedGroupsScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [results, setResults] = useState([]);
  const { setGroup, setGroupWasCreated, state } = useContext(GroupContext);

  useFocusEffect(
    React.useCallback(() => {
      if (state.groupWasCreated) {
        const test = async () => {
          setIsLoading(true);
          try {
            const response = await thimbleApi.get("g/created");
            setResults(response.data);
            setIsLoading(false);
            setGroupWasCreated({ value: false });
          } catch (error) {}
        };

        test();
      }
    }, [state])
  );

  const fetchInitialGroups = async () => {
    setIsLoading(true);
    try {
      const response = await thimbleApi.get("g/created");
      setResults(response.data);
      setIsLoading(false);
    } catch (error) {}
  };

  const fetchGroups = async () => {
    try {
      const response = await thimbleApi.get("g/created");
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
      ) : (
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
          ListEmptyComponent={
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                marginHorizontal: 10,
                fontWeight: "500",
                marginTop: 50,
              }}
            >
              Press the plus at the top to create your first group!
            </Text>
          }
        />
      )}
    </View>
  );
};

export default CreatedGroupsScreen;
