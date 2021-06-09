import React from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import FeedScreen from "../screens/FeedScreen";
import InboxScreen from "../screens/InboxScreen";
import { Feather } from "@expo/vector-icons";
import LogoHeader from "../components/LogoHeader";

const FeedFlow = createStackNavigator();

const FeedFlowStack = ({ navigation }) => (
  <FeedFlow.Navigator>
    <FeedFlow.Screen
      name="Feed"
      component={FeedScreen}
      options={{
        headerTitle: <LogoHeader />,
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Inbox")}>
            <Feather
              name="inbox"
              size={27}
              color="black"
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>
        ),
      }}
    />
    <FeedFlow.Screen
      name="Inbox"
      component={InboxScreen}
      options={{ headerBackTitleVisible: false }}
    />
  </FeedFlow.Navigator>
);

export default FeedFlowStack;
