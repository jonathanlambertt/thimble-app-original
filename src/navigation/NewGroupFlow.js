import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NewGroupScreen from "../screens/NewGroupScreen";
import { Button } from "react-native-elements";

const NewGroupFlow = createStackNavigator();

const NewGroupFlowStack = () => (
  <NewGroupFlow.Navigator>
    <NewGroupFlow.Screen
      name="Create Group"
      component={NewGroupScreen}
      options={{
        headerShown: true,
        headerBackTitle: "Cancel",
      }}
    />
  </NewGroupFlow.Navigator>
);

export default NewGroupFlowStack;
