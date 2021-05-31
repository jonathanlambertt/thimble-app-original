import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Avatar } from "react-native-elements";
import { Button } from "react-native-elements";

const ProfileScreen = () => {
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={{ alignItems: "center", marginTop: 25 }}>
        <Avatar
          containerStyle={{
            borderWidth: 0.5,
            borderColor: "#d3d3d3",
          }}
          rounded
          icon={{ name: "user", type: "feather", color: "#333" }}
          size={80}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 25,
          alignItems: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>0</Text>
          <Text style={{ fontSize: 16 }}>posts</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>0</Text>
          <Text style={{ fontSize: 16 }}>groups</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>0</Text>
          <Text style={{ fontSize: 16 }}>friends</Text>
        </View>
      </View>
      <View style={{ marginTop: 25, paddingHorizontal: 30 }}>
        <Button
          buttonStyle={{
            borderColor: "#A6A3FF",
            borderWidth: 1,
            paddingVertical: 8,
          }}
          titleStyle={{ color: "#A6A3FF", fontSize: 16, fontWeight: "500" }}
          title="Edit Profile"
          type="outline"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default ProfileScreen;
