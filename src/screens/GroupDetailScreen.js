import React from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import GroupMembersScreen from "../screens/GroupMembersScreen";

const Tab = createMaterialTopTabNavigator();
const PlaceholderScreen = () => {
  return <View style={{ flex: 1, backgroundColor: "#fff" }}></View>;
};

const GroupDetailScreen = () => {
  return (
    <Tab.Navigator
      swipeEnabled={false}
      tabBarOptions={{
        activeTintColor: "#333",
        inactiveTintColor: "#9f9f9f",
        indicatorStyle: {
          width: 0,
        },
        style: { shadowColor: "#fff" },
        labelStyle: {
          fontSize: 15,
          fontWeight: "bold",
          textTransform: "none",
        },
      }}
    >
      <Tab.Screen name="Posts" component={PlaceholderScreen} />
      <Tab.Screen name="Members" component={GroupMembersScreen} />
    </Tab.Navigator>
  );
};

export default GroupDetailScreen;
