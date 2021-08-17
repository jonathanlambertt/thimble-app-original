import React from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ReactScreen from "../screens/ReactScreen";
import { Feather } from "@expo/vector-icons";

const ReactionFlow = createStackNavigator();

const ReactionFlowStack = ({ navigation: { goBack } }) => (
  <ReactionFlow.Navigator>
    <ReactionFlow.Screen
      name="React"
      component={ReactScreen}
      options={{
        title: "Send a Reaction",
        headerBackTitleVisible: false,
        headerLeft: () => (
          <TouchableOpacity onPress={() => goBack()}>
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
  </ReactionFlow.Navigator>
);

export default ReactionFlowStack;
