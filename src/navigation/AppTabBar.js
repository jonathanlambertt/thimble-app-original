import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import FeedFlow from "./feed/FeedFlow";
import SearchFlow from "./search/SearchFlow";
import GroupsFlow from "./groups/GroupsFlow";
import ProfileFlow from "./profile/ProfileFlow";

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
          inactiveTintColor: "#a9a9a9",
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            if (route.name == "FeedTab") {
              if (focused) {
                return <Icon name="home2-fill" size={tabIconSize} />;
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
                    <Icon name="groups2-fill" size={41} />
                  </View>
                );
              } else {
                return (
                  <View style={{ marginTop: 8 }}>
                    <Icon
                      name="groups2-outline"
                      size={41}
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
        <TabBar.Screen name="FeedTab" component={FeedFlow} />
        <TabBar.Screen name="SearchTab" component={SearchFlow} />
        <TabBar.Screen
          name="New Post"
          component={PlaceholderScreen}
          options={{
            tabBarIcon: () => <Icon name="add2" color="#FF878A" size={41} />,
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("NewPostFlow");
            },
          })}
        />
        <TabBar.Screen name="GroupsTab" component={GroupsFlow} />
        <TabBar.Screen name="ProfileTab" component={ProfileFlow} />
      </TabBar.Navigator>
    );
  }
};

export default AppTabBar;
