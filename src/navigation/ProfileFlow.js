import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen";

const ProfileFlow = createStackNavigator();

const ProfileFlowStack = () => (
  <ProfileFlow.Navigator>
    <ProfileFlow.Screen name="Profile" component={ProfileScreen} />
  </ProfileFlow.Navigator>
);

export default ProfileFlowStack;
