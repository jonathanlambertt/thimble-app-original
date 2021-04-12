import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import { createIconSetFromIcoMoon, Feather } from "@expo/vector-icons";
import FeedFlow from "./FeedFlow";
import SearchFlow from "./SearchFlow";
import GroupsFlow from "./GroupsFlow";
import ProfileFlow from "./ProfileFlow";

const TabBar = createBottomTabNavigator();
const PlaceholderScreen = () => {};

const Icon = createIconSetFromIcoMoon(
  require("../../assets/selection.json"),
  "IcoMoon",
  "icomoon.ttf"
);

const AppTabBar = () => {
  const [fontsLoaded] = useFonts({
    IcoMoon: require("../../assets/icons/icomoon.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <TabBar.Navigator
        tabBarOptions={{
          showLabel: false,
          activeTintColor: "#A6A3FF",
          inactiveTintColor: "#333333",
        }}
      >
        <TabBar.Screen
          name="Feed"
          component={FeedFlow}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={33} />
            ),
          }}
        />
        <TabBar.Screen
          name="Search"
          component={SearchFlow}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="search" color={color} size={33} />
            ),
          }}
        />
        <TabBar.Screen
          name="New Post"
          component={PlaceholderScreen}
          options={{
            tabBarIcon: () => (
              <Feather name="plus-circle" color="#FF878A" size={37} />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("NewPostFlow");
            },
          })}
        />
        <TabBar.Screen
          name="Groups"
          component={GroupsFlow}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="groups" color={color} size={33} />
            ),
          }}
        />
        <TabBar.Screen
          name="Profile"
          component={ProfileFlow}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="profile" color={color} size={33} />
            ),
          }}
        />
      </TabBar.Navigator>
    );
  }
};

export default AppTabBar;
