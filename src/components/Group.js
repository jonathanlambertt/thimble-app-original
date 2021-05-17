import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PhotoThumbnail from "../components/PhotoThumbnail";
import { Entypo } from "@expo/vector-icons";

const Group = ({ result }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        marginBottom: 10,
        paddingLeft: 10,
        paddingTop: 10,
      }}
    >
      {result.banner ? (
        <PhotoThumbnail
          uri={result.sender.profile_picture}
          width={60}
          height={60}
        />
      ) : (
        <PhotoThumbnail width={60} height={60} />
      )}
      <View style={{ flex: 1, alignSelf: "center" }}>
        <Text
          style={{
            marginLeft: 11,
            fontSize: 17,
            marginBottom: 2,
            fontWeight: "500",
          }}
        >
          {result.name}
        </Text>
        <Text style={{ marginLeft: 11, color: "#9f9f9f" }}>
          {result.members}{" "}
          {result.members == 1 ? <Text>member</Text> : <Text>members</Text>} · 0
          posts
        </Text>
      </View>
      <Entypo
        style={{ alignSelf: "center", marginRight: 15 }}
        name="chevron-right"
        size={22}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Group;
