import React, { useContext } from "react";
import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import GroupMembersScreen from "../screens/GroupMembersScreen";
import GroupPostsScreen from "../screens/GroupPostsScreen";
import { Context as GroupContext } from "../context/GroupContext";

const Tab = createMaterialTopTabNavigator();

const GroupDetailScreen = () => {
  const { state } = useContext(GroupContext);
  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        {state.group.group.description ? (
          <Text
            style={{
              marginHorizontal: 10,
              marginVertical: 5,
              fontWeight: "500",
              fontSize: 13,
            }}
          >
            {state.group.group.description}
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
            style: {
              shadowColor: "#fff",
              borderBottomWidth: 1,
              borderColor: "#cecece",
            },
            labelStyle: {
              fontSize: 15,
              fontWeight: "bold",
              textTransform: "none",
            },
          }}
        >
          <Tab.Screen name="Posts" component={GroupPostsScreen} />
          <Tab.Screen name="Members" component={GroupMembersScreen} />
        </Tab.Navigator>
      </View>
    </>
  );
};

export default GroupDetailScreen;
