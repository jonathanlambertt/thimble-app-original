import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GroupsScreen from "../screens/GroupsScreen";

const GroupsFlow = createStackNavigator();

const GroupsFlowStack = () => (
  <GroupsFlow.Navigator>
    <GroupsFlow.Screen name="Groups" component={GroupsScreen} />
  </GroupsFlow.Navigator>
);

export default GroupsFlowStack;
