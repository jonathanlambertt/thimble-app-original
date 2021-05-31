import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import ProfileScreen from "../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";

const ProfileFlow = createStackNavigator();

const ProfileFlowStack = ({ navigation }) => (
  <ProfileFlow.Navigator>
    <ProfileFlow.Screen
      options={{
        headerRight: () => (
          <TouchableOpacity>
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
  </ProfileFlow.Navigator>
);

export default ProfileFlowStack;
