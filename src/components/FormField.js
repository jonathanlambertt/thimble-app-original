import React from "react";
import { StyleSheet, Platform } from "react-native";
import { Input } from "react-native-elements";

const FormField = ({ placeholder, value, setValue, isSecure, username }) => {
  if (username) {
    return (
      <Input
        value={value}
        onChangeText={setValue}
        secureTextEntry={isSecure}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={placeholder}
        inputStyle={styles.inputStyle}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        keyboardType={
          Platform.OS === "ios" ? "ascii-capable" : "visible-password"
        }
      />
    );
  } else {
    return (
      <Input
        value={value}
        onChangeText={setValue}
        secureTextEntry={isSecure}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={placeholder}
        inputStyle={styles.inputStyle}
        inputContainerStyle={{ borderBottomWidth: 0 }}
      />
    );
  }
};

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: "#f4f4f4",
    borderWidth: 1,
    borderColor: "#cecece",
    borderRadius: 4,
    paddingLeft: 12,
    paddingVertical: 14,
    marginBottom: -15,
    marginHorizontal: 15,
  },
});

export default FormField;
