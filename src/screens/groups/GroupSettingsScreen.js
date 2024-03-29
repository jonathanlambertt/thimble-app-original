import React, { useContext } from "react";
import { ScrollView, Alert } from "react-native";
import { ListItem } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import thimbleApi from "../../api/thimble";
import { Context as GroupContext } from "../../context/GroupContext";

const GroupSettingsScreen = ({ navigation }) => {
  const { state } = useContext(GroupContext);

  const leaveGroup = async () => {
    try {
      await thimbleApi.put(`g/${state.group.group.uuid}/leave`);
      navigation.navigate("Groups");
    } catch (error) {}
  };

  const displayAlert = () =>
    Alert.alert("Alert", "Leave group?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Leave",
        onPress: () => leaveGroup(),
        style: "destructive",
      },
    ]);

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingTop: 12,
        marginHorizontal: 12,
      }}
    >
      {state.group.user_status === "owner" ? (
        <>
          <ListItem
            style={{ borderTopRightRadius: 4, borderTopLeftRadius: 4 }}
            onPress={() => navigation.navigate("AddFriendsItem")}
            containerStyle={{
              borderTopRightRadius: 4,
              borderTopLeftRadius: 4,
            }}
            bottomDivider
          >
            <Feather name="user-plus" size={25} />
            <ListItem.Content>
              <ListItem.Title style={{ fontWeight: "500" }}>
                Add Friends
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <ListItem
            onPress={() => navigation.navigate("EditGroupItem")}
            containerStyle={{
              borderBottomRightRadius: 4,
              borderBottomLeftRadius: 4,
            }}
          >
            <Feather name="edit-2" size={24} />
            <ListItem.Content>
              <ListItem.Title style={{ fontWeight: "500" }}>
                Edit Group
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </>
      ) : (
        <ListItem
          containerStyle={{
            borderTopRightRadius: 4,
            borderTopLeftRadius: 4,
            borderBottomRightRadius: 4,
            borderBottomLeftRadius: 4,
          }}
          style={{
            borderTopRightRadius: 4,
            borderTopLeftRadius: 4,
            borderBottomRightRadius: 4,
            borderBottomLeftRadius: 4,
          }}
          onPress={() => displayAlert()}
        >
          <ListItem.Content>
            <ListItem.Title
              style={{
                alignSelf: "center",
                color: "#ff878a",
                fontWeight: "bold",
              }}
            >
              Leave group
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      )}
    </ScrollView>
  );
};

export default GroupSettingsScreen;
