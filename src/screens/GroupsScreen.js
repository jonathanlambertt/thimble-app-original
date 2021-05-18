import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CreatedGroupsScreen from "./CreatedGroupsScreen";
import JoinedGroupsScreen from "./JoinedGroupsScreen";

const TopTab = createMaterialTopTabNavigator();

const GroupsScreen = () => {
  return (
    <TopTab.Navigator
      tabBarOptions={{
        activeTintColor: "#333",
        inactiveTintColor: "#9f9f9f",
        indicatorStyle: {
          backgroundColor: "#a6a3ff",
        },
        labelStyle: {
          fontSize: 14,
          fontWeight: "bold",
          textTransform: "none",
        },
      }}
    >
      <TopTab.Screen name="Created" component={CreatedGroupsScreen} />
      <TopTab.Screen name="Joined" component={JoinedGroupsScreen} />
    </TopTab.Navigator>
  );
};

export default GroupsScreen;
