import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Avatar } from "react-native-elements";
import { Button } from "react-native-elements";
import thimbleApi from "../api/thimble";

const ProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = navigation.addListener("focus", async () => {
      try {
        const response = await thimbleApi.get("u/profile");
        setProfile(response.data);
      } catch (error) {}
    });

    return fetchProfile;
  }, [navigation]);

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={{ alignItems: "center", marginTop: 25 }}>
        {profile.profile_picture ? (
          <Avatar
            containerStyle={{
              borderWidth: 0.5,
              borderColor: "#d3d3d3",
            }}
            rounded
            icon={{ name: "user", type: "feather", color: "#333" }}
            size={80}
            source={{
              uri: profile.profile_picture,
            }}
          />
        ) : (
          <Avatar
            containerStyle={{
              borderWidth: 0.5,
              borderColor: "#d3d3d3",
            }}
            rounded
            icon={{ name: "user", type: "feather", color: "#333" }}
            size={80}
          />
        )}
      </View>
      <View style={styles.infoTextContainer}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            {profile.posts}
          </Text>
          <Text style={{ fontSize: 16 }}>posts</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            {profile.groups}
          </Text>
          <Text style={{ fontSize: 16 }}>groups</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            {profile.friends}
          </Text>
          <Text style={{ fontSize: 16 }}>friends</Text>
        </View>
      </View>
      <View style={{ marginTop: 25, paddingHorizontal: 30 }}>
        <Button
          buttonStyle={styles.editProfileButton}
          titleStyle={{ color: "#A6A3FF", fontSize: 16, fontWeight: "600" }}
          title="Edit Profile"
          type="outline"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  infoTextContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 25,
    alignItems: "center",
  },
  editProfileButton: {
    borderColor: "#A6A3FF",
    borderWidth: 1,
    paddingVertical: 8,
  },
});

export default ProfileScreen;
