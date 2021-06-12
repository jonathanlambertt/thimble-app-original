import React from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import EditProfileScreen from "../screens/EditProfileScreen";
import { Feather } from "@expo/vector-icons";

const EditProfileFlow = createStackNavigator();

const EditProfileFlowStack = ({ navigation }) => (
  <EditProfileFlow.Navigator>
    <EditProfileFlow.Screen
      options={{
        title: "Edit Profile",
        headerBackTitleVisible: false,
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Feather
              name="x"
              size={26}
              color="black"
              style={{ marginLeft: 17 }}
            />
          </TouchableOpacity>
        ),
      }}
      name="EditProfile"
      component={EditProfileScreen}
    />
  </EditProfileFlow.Navigator>
);

export default EditProfileFlowStack;
