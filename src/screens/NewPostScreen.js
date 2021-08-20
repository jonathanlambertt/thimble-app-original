import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SectionList,
  ActivityIndicator,
  Text,
} from "react-native";
import Group from "../components/Group";
import thimbleApi from "../api/thimble";
import { Context as NewPostContext } from "../context/NewPostContext";

const NewPostScreen = ({ navigation }) => {
  const [createdGroups, setCreatedGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const { setGroup } = useContext(NewPostContext);

  useEffect(() => {
    setIsLoading(true);
    fetchCreatedGroups();
    fetchJoinedGroups();
    setIsLoading(false);
  }, []);

  const fetchCreatedGroups = async () => {
    try {
      const response = await thimbleApi.get("g/created");
      setCreatedGroups(response.data);
    } catch (error) {}
  };

  const fetchJoinedGroups = async () => {
    try {
      const response = await thimbleApi.get("g/joined");
      setJoinedGroups(response.data);
    } catch (error) {}
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <SectionList
          sections={[
            { title: "Created Groups", data: createdGroups },
            {
              title: "Joined Groups",
              data: joinedGroups,
            },
          ]}
          renderItem={({ item, section }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("NewPostFlowPost");
                setGroup({ group: item });
              }}
            >
              <Group result={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.group.uuid}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                You have not created or joined any groups.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default NewPostScreen;
