import React from "react";
import { TouchableOpacity } from "react-native";
import GroupNewPostScreen from "../../screens/groups/GroupNewPostScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";

const GroupNewPostFlow = createStackNavigator();

const GroupNewPostFlowStack = ({ navigation }) => (
  <GroupNewPostFlow.Navigator>
    <GroupNewPostFlow.Screen
      options={{
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate("GroupDetail")}>
            <Feather
              name="x"
              size={26}
              color="black"
              style={{ marginLeft: 17 }}
            />
          </TouchableOpacity>
        ),
      }}
      name="New Post"
      component={GroupNewPostScreen}
    />
  </GroupNewPostFlow.Navigator>
);

export default GroupNewPostFlowStack;
