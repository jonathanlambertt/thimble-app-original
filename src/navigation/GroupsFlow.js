import React from "react";
import { TouchableOpacity, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import GroupsScreen from "../screens/GroupsScreen";
import { Feather, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import GroupDetailScreen from "../screens/GroupDetailScreen";
import GroupSettingsScreen from "../screens/GroupSettingsScreen";
import PhotoThumbnail from "../components/PhotoThumbnail";
import EditGroupMembersScreen from "../screens/EditGroupMembersScreen";
import EditGroupScreen from "../screens/EditGroupScreen";
import { Avatar } from "react-native-elements";

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
        title: route.params.group.group.name,
        headerTitleAlign: "left",
        headerStyle: { shadowColor: "#fff", elevation: 0 },
        headerRight: () => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("GroupSettings")}
            >
              <Ionicons
                name="settings-outline"
                size={26}
                color="black"
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("GroupNewPostFlow")}
            >
              <FontAwesome5
                name="paper-plane"
                size={20}
                color="black"
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
          </View>
        ),
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Groups")}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ alignSelf: "center" }}>
                <Feather name="chevron-left" size={33} color="#a6a3ff" />
              </View>
              <View style={{ alignSelf: "center" }}>
                {route.params.group.group.banner ? (
                  <PhotoThumbnail
                    uri={route.params.group.group.banner}
                    width={30}
                    height={30}
                  />
                ) : (
                  <Avatar
                    containerStyle={{
                      borderWidth: 0.5,
                      borderColor: "#d3d3d3",
                    }}
                    rounded
                    size={30}
                  />
                )}
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
    <GroupsFlow.Screen
      options={{ title: "Edit Group", headerBackTitleVisible: false }}
      name="EditGroupItem"
      component={EditGroupScreen}
    />
  </GroupsFlow.Navigator>
);

export default GroupsFlowStack;
