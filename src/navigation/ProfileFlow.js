import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import ProfileScreen from "../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import ProfileSettingsScreen from "../screens/ProfileSettingsScreen";

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
      }}
      name="ProfileSettings"
      component={ProfileSettingsScreen}
    />
  </ProfileFlow.Navigator>
);

export default ProfileFlowStack;
