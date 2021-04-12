import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";

const ProfileScreen = () => {
  const { logout } = useContext(AuthContext);

  return (
    <View>
      <Button title="log out" onPress={() => logout()} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProfileScreen;
