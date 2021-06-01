import React, { useContext } from "react";
import { ScrollView, Alert } from "react-native";
import { ListItem } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";

const ProfileSettingsScreen = () => {
  const { logout } = useContext(AuthContext);

  const displayAlert = () =>
    Alert.alert("Alert", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log out",
        onPress: () => logout(),
        style: "destructive",
      },
    ]);

  return (
    <ScrollView style={{ marginHorizontal: 12, paddingTop: 12 }}>
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
            Log out
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </ScrollView>
  );
};

export default ProfileSettingsScreen;
