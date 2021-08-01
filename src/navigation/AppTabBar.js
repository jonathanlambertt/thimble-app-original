import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import { createIconSetFromIcoMoon, Feather } from "@expo/vector-icons";
import FeedFlow from "./FeedFlow";
import SearchFlow from "./SearchFlow";
import GroupsFlow from "./GroupsFlow";
import ProfileFlow from "./ProfileFlow";

const TabBar = createBottomTabNavigator();
const tabIconSize = 29;
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
          activeTintColor: "#333",
          inactiveTintColor: "#b6b6b6",
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            if (route.name == "FeedTab") {
              if (focused) {
                return <Icon name="home2-fill-other" size={tabIconSize} />;
              } else {
                return (
                  <Icon
                    name="home2-outline"
                    size={tabIconSize}
                    style={{ color: color }}
                  />
                );
              }
            }

            if (route.name == "SearchTab") {
              if (focused) {
                return <Icon name="search2-fill" size={tabIconSize} />;
              } else {
                return (
                  <Icon
                    name="search2-outline"
                    size={tabIconSize}
                    style={{ color: color }}
                  />
                );
              }
            }

            if (route.name == "GroupsTab") {
              if (focused) {
                return (
                  <View style={{ marginTop: 8 }}>
                    <Icon name="groups2-fill" size={43} />
                  </View>
                );
              } else {
                return (
                  <View style={{ marginTop: 8 }}>
                    <Icon
                      name="groups2-outline"
                      size={43}
                      style={{ color: color }}
                    />
                  </View>
                );
              }
            }

            if (route.name == "ProfileTab") {
              if (focused) {
                return <Icon name="user2-fill" size={tabIconSize} />;
              } else {
                return (
                  <Icon
                    name="user2-outline"
                    size={tabIconSize}
                    style={{ color: color }}
                  />
                );
              }
            }
          },
        })}
      >
        <TabBar.Screen
          name="FeedTab"
          component={FeedFlow}
          // options={{
          //   tabBarIcon: ({ color }) => (
          //     <Icon name="home" color={color} size={tabIconSize} />
          //   ),
          // }}
        />
        <TabBar.Screen
          name="SearchTab"
          component={SearchFlow}
          // options={{
          //   tabBarIcon: ({ color }) => (
          //     <Icon name="search" color={color} size={tabIconSize} />
          //   ),
          // }}
        />
        <TabBar.Screen
          name="New Post"
          component={PlaceholderScreen}
          options={{
            tabBarIcon: () => (
              // <Feather name="plus-circle" color="#FF878A" size={37} />
              <Icon name="add2" color="#FF878A" size={42} />
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
          name="GroupsTab"
          component={GroupsFlow}
          // options={{
          //   tabBarIcon: ({ color }) => (
          //     <Icon name="groups" color={color} size={tabIconSize} />
          //   ),
          // }}
        />
        <TabBar.Screen
          name="ProfileTab"
          component={ProfileFlow}
          // options={{
          //   tabBarIcon: ({ color }) => (
          //     <Icon name="profile" color={color} size={tabIconSize} />
          //   ),
          // }}
        />
      </TabBar.Navigator>
    );
  }
};

export default AppTabBar;
