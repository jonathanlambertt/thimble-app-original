import React from "react";
import { TouchableOpacity } from "react-native";
import NewPostScreen from "../screens/NewPostScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";

const NewPostFlow = createStackNavigator();

const NewPostFlowStack = ({ navigation: { goBack } }) => (
  <NewPostFlow.Navigator>
    <NewPostFlow.Screen
      name="New Post"
      component={NewPostScreen}
      options={{
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
  </NewPostFlow.Navigator>
);

export default NewPostFlowStack;
