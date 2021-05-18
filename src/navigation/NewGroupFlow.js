import React from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import NewGroupScreen from "../screens/NewGroupScreen";
import { Feather } from "@expo/vector-icons";

const NewGroupFlow = createStackNavigator();

const NewGroupFlowStack = ({ navigation }) => (
  <NewGroupFlow.Navigator>
    <NewGroupFlow.Screen
      name="Create Group"
      component={NewGroupScreen}
      options={{
        headerShown: true,
        headerBackTitle: "Cancel",
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Groups")}>
            <Feather
              name="x"
              size={26}
              color="black"
              style={{ marginLeft: 17 }}
            />
          </TouchableOpacity>
        ),
      }}
    />
  </NewGroupFlow.Navigator>
);

export default NewGroupFlowStack;
