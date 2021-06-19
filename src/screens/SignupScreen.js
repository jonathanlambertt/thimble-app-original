import React, { useState, useContext } from "react";
import { useFonts } from "expo-font";
import FormField from "../components/FormField";
import { Button } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
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

const SignupScreen = ({ navigation }) => {
  const [loaded] = useFonts({
    GrandHotel: require("../../assets/fonts/GrandHotel-Regular.ttf"),
  });
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [full_name, setFullName] = useState("");
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  React.useEffect(() => {
    const clearError = navigation.addListener("blur", () => {
      clearErrorMessage();
    });

    return clearError;
  }, [navigation]);

  const checkSpaces = (s) => {
    let regSpace = new RegExp(/\s/);
    if (regSpace.test(s)) {
      return false;
    } else {
      setUsername(s);
    }
    return true;
  };

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
              <Text style={styles.screenTitle}>Create your Account</Text>
              <FormField
                placeholder="Email"
                value={email}
                setValue={setEmail}
                isSecure={false}
                username={false}
              />
              <FormField
                placeholder="Full Name (optional)"
                value={full_name}
                setValue={setFullName}
                isSecure={false}
                username={false}
              />
              <FormField
                placeholder="Username"
                value={username}
                setValue={checkSpaces}
                isSecure={false}
                username={true}
              />
              <FormField
                placeholder="Password"
                value={password}
                setValue={setPassword}
                isSecure={true}
                username={false}
              />
              <Text style={styles.terms}>
                By signing up you agree to the Terms of Service.
              </Text>
              {state.errorMessage ? (
                <Text
                  style={{ color: "red", textAlign: "center", marginTop: 10 }}
                >
                  {state.errorMessage}
                </Text>
              ) : null}
              <View style={{ width: "100%", paddingHorizontal: 25 }}>
                <Button
                  title="Sign up"
                  buttonStyle={styles.submitButton}
                  titleStyle={styles.submitButtonTitle}
                  onPress={() =>
                    signup({ username, email, password, full_name })
                  }
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
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ fontWeight: "bold", color: "#FF878A" }}>Log in</Text>
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
  terms: {
    color: "#cecece",
  },
  submitButton: {
    backgroundColor: "#A6A3FF",
    padding: 10,
    marginTop: 13,
  },
  submitButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default SignupScreen;
