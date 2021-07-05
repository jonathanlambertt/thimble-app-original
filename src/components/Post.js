import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import PhotoThumbnail from "../components/PhotoThumbnail";
import { LinkPreview } from "@flyerhq/react-native-link-preview";
import { Entypo, Feather } from "@expo/vector-icons";
import * as RootNavigation from "../../src/RootNavigation";

const Post = ({ post }) => {
  const onShare = async () => {
    if (post.post_type == 0) {
      try {
        const result = await Share.share({ message: post.text });
      } catch (error) {
        alert(error.message);
      }
    }
    if (post.post_type == 1) {
      try {
        const result = await Share.share({
          message: "Link from Thimble",
          url: post.link,
        });
      } catch (error) {
        alert(error.message);
      }
    }
    if (post.post_type == 2) {
      try {
        const result = await Share.share({
          message: "Photo from Thimble",
          url: post.photo,
        });
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {post.owner.profile_picture ? (
          <PhotoThumbnail
            uri={post.owner.profile_picture}
            width={37}
            height={37}
          />
        ) : (
          <PhotoThumbnail width={37} height={37} />
        )}

        <View style={styles.headerTextContainer}>
          <Text style={{ flex: 1, flexWrap: "wrap" }}>
            <Text style={{ fontWeight: "700" }}>{post.owner.user}</Text>
            <Text> posted in </Text>
            <Text style={{ fontWeight: "700" }}>{post.group.name} </Text>
            <Text style={{ color: "#9f9f9f", fontWeight: "600" }}>
              {post.timestamp}
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.postContent}>
        {post.title ? (
          <Text
            style={{
              fontSize: 17,
              marginBottom: 8,
              fontWeight: "500",
              marginTop: -3,
            }}
          >
            {post.title}
          </Text>
        ) : null}
        {post.post_type === 0 ? (
          <Text style={{ fontSize: 16, marginTop: -4 }}>{post.text}</Text>
        ) : post.post_type === 1 ? (
          <LinkPreview
            containerStyle={{
              backgroundColor: "#f5f5f5",
              borderRadius: 4,
            }}
            text={post.link}
          />
        ) : post.post_type === 2 ? (
          <Image
            style={{
              aspectRatio: 1,
              borderRadius: 3,
              borderWidth: 0.5,
              borderColor: "#d3d3d3",
            }}
            source={{ uri: post.photo }}
          />
        ) : null}
        {/* <View style={{ flexDirection: "row", marginTop: 5 }}>
          <Text style={{ fontWeight: "600" }}>17 reactions - </Text>
          <PhotoThumbnail
            uri={post.owner.profile_picture}
            width={20}
            height={20}
          />
          <Text>:</Text>
          <Text style={{ alignSelf: "center" }}>😂</Text>
          <Text>, </Text>
          <PhotoThumbnail
            uri={post.owner.profile_picture}
            width={20}
            height={20}
          />
          <Text>:</Text>
          <Text style={{ alignSelf: "center" }}>🥰</Text>
        </View> */}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 10,
          marginTop: -2,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            RootNavigation.navigate("ReactFlow");
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Entypo
              style={{ fontWeight: "bold" }}
              name="emoji-happy"
              size={18}
              color="black"
            />
            <Text
              style={{ alignSelf: "center", fontWeight: "bold", fontSize: 12 }}
            >
              {" "}
              react
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onShare}>
          <View style={{ flexDirection: "row" }}>
            <Feather name="share" size={18} color="black" />
            <Text
              style={{ alignSelf: "center", fontWeight: "bold", fontSize: 12 }}
            >
              {" "}
              share
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderColor: "#cecece",
    backgroundColor: "#fff",
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 13,
    paddingTop: 11,
    marginRight: 10,
  },
  headerTextContainer: {
    alignSelf: "center",
    marginLeft: 10,
    flexShrink: 1,
    flexDirection: "row",
  },
  postContent: {
    marginLeft: 13,
    marginBottom: 13,
    marginRight: 13,
    marginTop: 8,
  },
});

export default Post;
