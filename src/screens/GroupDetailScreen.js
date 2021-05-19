import React from "react";
import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import GroupMembersScreen from "../screens/GroupMembersScreen";
import GroupPostsScreen from "../screens/GroupPostsScreen";

const Tab = createMaterialTopTabNavigator();

const GroupDetailScreen = ({ route }) => {
  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        {route.params.group.description ? (
          <Text
            style={{
              marginHorizontal: 10,
              marginVertical: 5,
              fontWeight: "500",
              fontSize: 13,
            }}
          >
            {route.params.group.description}
          </Text>
        ) : null}
        <Tab.Navigator
          swipeEnabled={false}
          tabBarOptions={{
            activeTintColor: "#333",
            inactiveTintColor: "#9f9f9f",
            indicatorStyle: {
              width: 0,
            },
            style: { shadowColor: "#fff" },
            labelStyle: {
              fontSize: 15,
              fontWeight: "bold",
              textTransform: "none",
            },
          }}
        >
          <Tab.Screen
            name="Posts"
            children={() => <GroupPostsScreen group={route.params.group} />}
          />
          <Tab.Screen
            name="Members"
            children={() => <GroupMembersScreen group={route.params.group} />}
          />
        </Tab.Navigator>
      </View>
    </>
  );
};

export default GroupDetailScreen;
