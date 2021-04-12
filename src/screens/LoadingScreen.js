import React from "react";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;
