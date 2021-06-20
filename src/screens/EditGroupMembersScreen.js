import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import thimbleApi from "../api/thimble";
import UserInfo from "../components/UserInfo";
import { Entypo } from "@expo/vector-icons";
import { Context as GroupContext } from "../context/GroupContext";

const EditGroupMembersScreen = () => {
  const [currentMembers, setCurrentMembers] = useState([]);
  const [potentialMembers, setPotentialMembers] = useState([]);
  const { state } = useContext(GroupContext);

  const addOrRemoveMember = async (userUUID, action) => {
    if (action === "add") {
      setPotentialMembers(
        potentialMembers.filter((item) => item.uuid !== userUUID)
      );
      try {
        await thimbleApi.put(`g/${state.group.group.uuid}/add/${userUUID}`);
      } catch (error) {}
      fetchCurrentMembers();
    } else {
      setCurrentMembers(
        currentMembers.filter((item) => item.uuid !== userUUID)
      );
      try {
        await thimbleApi.put(`g/${state.group.group.uuid}/remove/${userUUID}`);
      } catch (error) {}
      fetchPotentialMembers();
    }
  };

  const fetchCurrentMembers = async () => {
    try {
      const response = await thimbleApi.get(
        `g/${state.group.group.uuid}/members/removable`
      );
      setCurrentMembers(response.data);
    } catch (error) {}
  };

  const fetchPotentialMembers = async () => {
    try {
      const response = await thimbleApi.get(
        `g/${state.group.group.uuid}/potential-members`
      );
      setPotentialMembers(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchPotentialMembers();
    fetchCurrentMembers();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SectionList
        sections={[
          { title: "Current Members", data: currentMembers },
          {
            title: "Add Friends",
            data: potentialMembers,
          },
        ]}
        renderItem={({ item, section }) => (
          <View
            style={{
              marginTop: 2,
              paddingLeft: 10,
              paddingVertical: 8,
              flexDirection: "row",
            }}
          >
            {item.profile_picture ? (
              <UserInfo
                uri={item.profile_picture}
                username={item.user}
                fullname={item.full_name}
              />
            ) : (
              <UserInfo username={item.user} fullname={item.full_name} />
            )}

            <View style={{ alignSelf: "center" }}>
              {section.title === "Current Members" ? (
                <TouchableOpacity
                  onPress={() => addOrRemoveMember(item.uuid, "remove")}
                  style={{
                    alignSelf: "flex-end",
                    borderRadius: 3,
                    backgroundColor: "#ff878a",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginRight: 15,
                  }}
                >
                  <Entypo
                    style={{ alignSelf: "center", fontWeight: "bold" }}
                    name="minus"
                    color="#fff"
                    size={18}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => addOrRemoveMember(item.uuid, "add")}
                  style={{
                    alignSelf: "flex-end",
                    borderRadius: 3,
                    backgroundColor: "#a3ceff",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginRight: 15,
                  }}
                >
                  <Entypo
                    style={{ alignSelf: "center", fontWeight: "bold" }}
                    name="plus"
                    color="#fff"
                    size={18}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item) => item.uuid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#f2f2f2",
  },
});

export default EditGroupMembersScreen;
