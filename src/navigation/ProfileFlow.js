import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import ProfileScreen from "../screens/ProfileScreen";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import ProfileSettingsScreen from "../screens/ProfileSettingsScreen";
import FriendsScreen from "../screens/FriendsScreen";

const ProfileFlow = createStackNavigator();

const ProfileFlowStack = ({ navigation }) => (
  <ProfileFlow.Navigator>
    <ProfileFlow.Screen
      options={{
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileSettings")}
          >
            <Ionicons
              name="settings-outline"
              size={26}
              color="black"
              style={{ marginRight: 15 }}
            />
          </TouchableOpacity>
        ),
      }}
      name="Profile"
      component={ProfileScreen}
    />
    <ProfileFlow.Screen
      options={{
        title: "Settings",
        headerBackTitleVisible: false,
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
              style={{ marginLeft: 17 }}
            />
          </TouchableOpacity>
        ),
      }}
      name="ProfileSettings"
      component={ProfileSettingsScreen}
    />
    <ProfileFlow.Screen
      options={{
        title: "Friends",
        headerBackTitleVisible: false,
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
              style={{ marginLeft: 17 }}
            />
          </TouchableOpacity>
        ),
      }}
      name="FriendsScreen"
      component={FriendsScreen}
    />
  </ProfileFlow.Navigator>
);

export default ProfileFlowStack;
