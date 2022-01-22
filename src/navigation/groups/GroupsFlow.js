import React from "react";
import { TouchableOpacity, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import GroupsScreen from "../../screens/groups/GroupsScreen";
import { Feather, Ionicons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import GroupDetailScreen from "../../screens/groups/GroupDetailScreen";
import GroupSettingsScreen from "../../screens/groups/GroupSettingsScreen";
import EditGroupMembersScreen from "../../screens/groups/EditGroupMembersScreen";
import EditGroupScreen from "../../screens/groups/EditGroupScreen";
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
                <Feather name="chevron-left" size={33} color="black" />
              </View>
              <View style={{ alignSelf: "center" }}>
                {route.params.group.group.banner ? (
                  <Avatar
                    containerStyle={{
                      borderWidth: 0.5,
                      borderColor: "#d3d3d3",
                    }}
                    rounded
                    size={30}
                    source={{
                      uri: profile_photo_url,
                    }}
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
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate("GroupDetail")}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
              style={{ marginLeft: 17 }}
            />
          </TouchableOpacity>
        ),
      }}
      name="GroupSettings"
      component={GroupSettingsScreen}
    />
    <GroupsFlow.Screen
      options={{
        title: "Edit Members",
        headerBackTitleVisible: false,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("GroupSettings")}
          >
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
              style={{ marginLeft: 17 }}
            />
          </TouchableOpacity>
        ),
      }}
      name="AddFriendsItem"
      component={EditGroupMembersScreen}
    />
    <GroupsFlow.Screen
      options={{
        title: "Edit Group",
        headerBackTitleVisible: false,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("GroupSettings")}
          >
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
              style={{ marginLeft: 17 }}
            />
          </TouchableOpacity>
        ),
      }}
      name="EditGroupItem"
      component={EditGroupScreen}
    />
  </GroupsFlow.Navigator>
);

export default GroupsFlowStack;
