import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import { createIconSetFromIcoMoon, Feather } from "@expo/vector-icons";
import FeedFlow from "./FeedFlow";
import SearchFlow from "./SearchFlow";
import GroupsFlow from "./GroupsFlow";
import ProfileFlow from "./ProfileFlow";

const TabBar = createBottomTabNavigator();
const tabIconSize = 32;
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
        // screenOptions={({ route }) => ({
        //   tabBarIcon: ({ focused, color, size, padding }) => {
        //     if (route.name == "FeedTab") {
        //       if (focused) {
        //         return <FontAwesome name="home" size={24} color="black" />;
        //       } else {
        //         return (
        //           <View>
        //             <Image
        //               style={{ width: 16, height: 16 }}
        //               source={require("../../assets/icons/fluent_home-16-regular.png")}
        //             />
        //           </View>
        //         );
        //       }
        //     }
        //   },
        // })}
      >
        <TabBar.Screen
          name="FeedTab"
          component={FeedFlow}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={tabIconSize} />
            ),
          }}
        />
        <TabBar.Screen
          name="SearchTab"
          component={SearchFlow}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="search" color={color} size={tabIconSize} />
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
          name="GroupsTab"
          component={GroupsFlow}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="groups" color={color} size={tabIconSize} />
            ),
          }}
        />
        <TabBar.Screen
          name="ProfileTab"
          component={ProfileFlow}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="profile" color={color} size={tabIconSize} />
            ),
          }}
        />
      </TabBar.Navigator>
    );
  }
};

export default AppTabBar;
