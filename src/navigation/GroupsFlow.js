import React from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import GroupsScreen from "../screens/GroupsScreen";
import { Feather } from "@expo/vector-icons";

const GroupsFlow = createStackNavigator();

const GroupsFlowStack = ({ navigation }) => (
  <GroupsFlow.Navigator>
    <GroupsFlow.Screen
      name="Groups"
      component={GroupsScreen}
      options={{
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate("NewGroup")}>
            <Feather
              name="plus"
              size={27}
              color="black"
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>
        ),
      }}
    />
  </GroupsFlow.Navigator>
);

export default GroupsFlowStack;
