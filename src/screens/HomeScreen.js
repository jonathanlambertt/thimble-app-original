import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import { Button } from "react-native-elements";

const HomeScreen = ({ navigation }) => {
  const [loaded] = useFonts({
    GrandHotel: require("../../assets/fonts/GrandHotel-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.inner}>
          <Text style={styles.appName}> thimble </Text>
          <Button
            title="Create an Account"
            buttonStyle={styles.registerButton}
            titleStyle={styles.registerButtonTitle}
            onPress={() => navigation.navigate("Signup")}
          />
          <Button
            title="Log In"
            type="clear"
            titleStyle={styles.logInButtonTitle}
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appName: {
    fontFamily: "GrandHotel",
    fontSize: 60,
  },
  registerButton: {
    backgroundColor: "#A6A3FF",
    padding: 10,
  },
  registerButtonTitle: {
    fontWeight: "bold",
  },
  logInButtonTitle: {
    color: "#a3ceff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
