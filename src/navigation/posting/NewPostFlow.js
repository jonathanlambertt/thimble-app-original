import React from "react";
import { TouchableOpacity } from "react-native";
import NewPostScreen from "../../screens/posting/NewPostScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather, AntDesign } from "@expo/vector-icons";
import NewPostFlowPost from "../../screens/posting/NewPostFlowPost";

const NewPostFlow = createStackNavigator();

const NewPostFlowStack = ({ navigation: { goBack }, navigation }) => (
  <NewPostFlow.Navigator>
    <NewPostFlow.Screen
      name="New Post"
      component={NewPostScreen}
      options={{
        title: "Post to",
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
    <NewPostFlow.Screen
      name="NewPostFlowPost"
      component={NewPostFlowPost}
      options={{
        headerBackTitleVisible: false,
        title: "New Post",
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate("New Post")}>
            <AntDesign
              name="arrowleft"
              size={24}
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
