import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

const LogoHeader = () => {
  const [loaded] = useFonts({
    GrandHotel: require("../../assets/fonts/GrandHotel-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  } else {
    return (
      <View style={styles.logoArea}>
        <Text style={styles.logo}> thimble </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  logoArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontFamily: "GrandHotel",
    fontSize: 42,
    marginTop: -3,
  },
});

export default LogoHeader;
