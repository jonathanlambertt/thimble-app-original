import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, Avatar } from "react-native-elements";
import thimbleApi from "../../api/thimble";
import { Context as UserContext } from "../../context/UserContext";

const ProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState({});
  const { setUser } = useContext(UserContext);

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
        <Text style={{ fontSize: 20, marginTop: 10 }}>@{profile.username}</Text>
        {profile.full_name ? (
          <Text style={{ fontSize: 15, color: "#9f9f9f", marginTop: 2 }}>
            {profile.full_name}
          </Text>
        ) : null}
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
        <TouchableOpacity onPress={() => navigation.navigate("FriendsScreen")}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              {profile.friends}
            </Text>
            <Text style={{ fontSize: 16 }}>friends</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 25, paddingHorizontal: 30 }}>
        <Button
          buttonStyle={styles.editProfileButton}
          titleStyle={{ color: "#000", fontSize: 16, fontWeight: "600" }}
          title="Edit Profile"
          type="outline"
          onPress={() => {
            navigation.navigate("EditProfileFlow");
            setUser({ user: profile });
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  infoTextContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    alignItems: "center",
  },
  editProfileButton: {
    borderColor: "#000",
    borderWidth: 1,
    paddingVertical: 8,
  },
});

export default ProfileScreen;
