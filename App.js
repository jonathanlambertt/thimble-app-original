import React, { useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthFlow from "./src/navigation/AuthFlow";
import AppTabBar from "./src/navigation/AppTabBar";
import NewPostFlow from "./src/navigation/NewPostFlow";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { navigationRef } from "./src/RootNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context as AuthContext } from "./src/context/AuthContext";
import LoadingScreen from "./src/screens/LoadingScreen";
import SignupSuccessScreen from "./src/screens/SignupSuccessScreen";
import NewGroupFlow from "./src/navigation/NewGroupFlow";
import GroupNewPostFlow from "./src/navigation/GroupNewPostFlow";
import { Provider as GroupProvider } from "./src/context/GroupContext";
import EditProfileFlow from "./src/navigation/EditProfileFlow";
import { Provider as UserProvider } from "./src/context/UserContext";
import * as Notifications from "expo-notifications";
import { Provider as NewPostProvider } from "./src/context/NewPostContext";
import ReactionFlow from "./src/navigation/ReactionFlow";
import { Provider as ReactionProvider } from "./src/context/ReactContext";

const RootStack = createStackNavigator();
const RootStackFlow = () => {
  const { state, setLoadingFalse, setToken } = useContext(AuthContext);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    const checkForToken = async () => {
      let token;
      try {
        token = await AsyncStorage.getItem("token");
      } catch (error) {}

      if (token !== null) {
        setToken();
      }

      setLoadingFalse();
    };

    checkForToken();
  }, []);

  if (state.isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <RootStack.Navigator
        headerMode="none"
        screenOptions={{ animationEnabled: false }}
        mode="modal"
      >
        {state.token !== null ? (
          <RootStack.Screen name="AppTabBar" component={AppTabBar} />
        ) : (
          <RootStack.Screen name="AuthFlow" component={AuthFlow} />
        )}
        <RootStack.Screen
          name="NewPostFlow"
          component={NewPostFlow}
          options={{ animationEnabled: true }}
        />
        <RootStack.Screen
          name="SignupSuccess"
          component={SignupSuccessScreen}
          options={{ animationEnabled: true }}
        />
        <RootStack.Screen
          name="NewGroup"
          component={NewGroupFlow}
          options={{ animationEnabled: true }}
        />
        <RootStack.Screen
          name="GroupNewPostFlow"
          component={GroupNewPostFlow}
          options={{ animationEnabled: true }}
        />
        <RootStack.Screen
          name="EditProfileFlow"
          component={EditProfileFlow}
          options={{ animationEnabled: true }}
        />
        <RootStack.Screen
          name="ReactFlow"
          component={ReactionFlow}
          options={{ animationEnabled: true }}
        />
      </RootStack.Navigator>
    );
  }
};

export default function App() {
  return (
    <AuthProvider>
      <GroupProvider>
        <UserProvider>
          <NewPostProvider>
            <ReactionProvider>
              <NavigationContainer ref={navigationRef}>
                <StatusBar style="auto" />
                <RootStackFlow />
              </NavigationContainer>
            </ReactionProvider>
          </NewPostProvider>
        </UserProvider>
      </GroupProvider>
    </AuthProvider>
  );
}
