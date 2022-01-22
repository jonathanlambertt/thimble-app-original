import React, { useState, useContext } from "react";
import { useFonts } from "expo-font";
import FormField from "../../components/FormField";
import { Button } from "react-native-elements";
import { Context as AuthContext } from "../../context/AuthContext";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [loaded] = useFonts({
    GrandHotel: require("../../../assets/fonts/GrandHotel-Regular.ttf"),
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { state, login, clearErrorMessage } = useContext(AuthContext);

  React.useEffect(() => {
    const clearError = navigation.addListener("blur", () => {
      clearErrorMessage();
    });

    return clearError;
  }, [navigation]);

  if (!loaded) {
    return null;
  } else {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <Text style={styles.appName}> thimble </Text>
              <Text style={styles.screenTitle}>Log in to Thimble</Text>
              <FormField
                placeholder="Username"
                value={username}
                setValue={setUsername}
                isSecure={false}
              />
              <FormField
                placeholder="Password"
                value={password}
                setValue={setPassword}
                isSecure={true}
              />
              <View style={{ width: "100%", paddingHorizontal: 25 }}>
                {state.errorMessage ? (
                  <Text
                    style={{ color: "red", textAlign: "center", marginTop: 10 }}
                  >
                    {state.errorMessage}
                  </Text>
                ) : null}
                <Button
                  title="Log in"
                  buttonStyle={styles.submitButton}
                  titleStyle={styles.submitButtonTitle}
                  onPress={() => login({ username, password })}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 5,
          }}
        >
          <Text style={{ fontWeight: "bold", marginRight: 4 }}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ fontWeight: "bold", color: "#FF878A" }}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appName: {
    fontFamily: "GrandHotel",
    fontSize: 60,
    marginBottom: -5,
  },
  screenTitle: {
    fontSize: 25,
    marginBottom: 13,
  },
  submitButton: {
    backgroundColor: "#A6A3FF",
    padding: 10,
    marginTop: 5,
  },
  submitButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default LoginScreen;
