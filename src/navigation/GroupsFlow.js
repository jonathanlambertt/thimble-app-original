import React from "react";
import { TouchableOpacity, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import GroupsScreen from "../screens/GroupsScreen";
import { Feather, Ionicons } from "@expo/vector-icons";
import GroupDetailScreen from "../screens/GroupDetailScreen";
import GroupSettingsScreen from "../screens/GroupSettingsScreen";
import PhotoThumbnail from "../components/PhotoThumbnail";
import EditGroupMembersScreen from "../screens/EditGroupMembersScreen";

const GroupsFlow = createStackNavigator();

const GroupsFlowStack = ({ navigation }) => (
  <GroupsFlow.Navigator headerMode="screen">
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
    <GroupsFlow.Screen
      options={({ route }) => ({
        title: route.params.group.name,
        headerTitleAlign: "left",
        headerStyle: { shadowColor: "#fff", elevation: 0 },
        headerRight: () => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("GroupSettings", {
                group: route.params.group,
              })
            }
          >
            <Ionicons
              name="settings-outline"
              size={26}
              color="black"
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>
        ),
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Groups")}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ alignSelf: "center" }}>
                <Feather name="chevron-left" size={33} color="#a6a3ff" />
              </View>
              <View style={{ alignSelf: "center" }}>
                <PhotoThumbnail
                  uri="https://bit.ly/3rEF965"
                  width={30}
                  height={30}
                />
              </View>
            </View>
          </TouchableOpacity>
        ),
      })}
      name="GroupDetail"
      component={GroupDetailScreen}
    />
    <GroupsFlow.Screen
      options={{
        title: "Settings",
        headerBackTitleVisible: false,
      }}
      name="GroupSettings"
      component={GroupSettingsScreen}
    />
    <GroupsFlow.Screen
      options={{ title: "Edit Members", headerBackTitleVisible: false }}
      name="AddFriendsItem"
      component={EditGroupMembersScreen}
    />
  </GroupsFlow.Navigator>
);

export default GroupsFlowStack;
