import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Button } from "react-native-elements";

const SignupSuccessScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <FontAwesome5 name="check-circle" size={80} color="green" />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 10,
            marginHorizontal: 10,
          }}
        >
          Your account was created successfully. You can now log in.
        </Text>
        <Button
          title="Log in"
          buttonStyle={styles.submitButton}
          titleStyle={styles.submitButtonTitle}
          type="clear"
          icon={
            <FontAwesome5
              name="arrow-right"
              color="#A6A3FF"
              style={{ marginLeft: 5 }}
              size={15}
            />
          }
          iconRight
          onPress={() => navigation.navigate("AuthFlow", { screen: "Login" })}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    padding: 10,
    marginTop: 13,
  },
  submitButtonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#A6A3FF",
  },
});

export default SignupSuccessScreen;
