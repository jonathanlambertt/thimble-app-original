import React from "react";
import NewPostScreen from "../screens/NewPostScreen";
import { createStackNavigator } from "@react-navigation/stack";

const NewPostFlow = createStackNavigator();

const NewPostFlowStack = () => (
  <NewPostFlow.Navigator>
    <NewPostFlow.Screen
      name="New Post"
      component={NewPostScreen}
      options={{ headerBackTitle: "Back" }}
    />
  </NewPostFlow.Navigator>
);

export default NewPostFlowStack;
