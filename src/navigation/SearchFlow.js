import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../screens/SearchScreen";

const SearchFlow = createStackNavigator();

const SearchFlowStack = () => (
  <SearchFlow.Navigator headerMode={"none"}>
    <SearchFlow.Screen name="Search" component={SearchScreen} />
  </SearchFlow.Navigator>
);

export default SearchFlowStack;
