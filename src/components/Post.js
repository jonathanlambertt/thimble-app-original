import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import PhotoThumbnail from "../components/PhotoThumbnail";
import { LinkPreview } from "@flyerhq/react-native-link-preview";

const Post = ({ post }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {post.owner.profile_picture ? (
          <PhotoThumbnail
            uri={post.owner.profile_picture}
            width={38}
            height={38}
          />
        ) : (
          <PhotoThumbnail width={38} height={38} />
        )}

        <View style={styles.headerTextContainer}>
          <Text style={{ flex: 1, flexWrap: "wrap" }}>
            <Text style={{ fontWeight: "700" }}>{post.owner.user}</Text>
            <Text> posted in </Text>
            <Text style={{ fontWeight: "700" }}>{post.group.name} </Text>
            <Text style={{ color: "#9f9f9f" }}>{post.timestamp}</Text>
          </Text>
        </View>
      </View>
      <View
        style={{
          marginLeft: 13,
          marginBottom: 13,
          marginRight: 10,
          marginTop: 6,
        }}
      >
        {post.title ? (
          <Text
            style={{
              fontSize: 17,
              marginBottom: 8,
              fontWeight: "500",
            }}
          >
            {post.title}
          </Text>
        ) : null}
        {post.post_type === 0 ? (
          <Text style={{ fontSize: 16 }}>{post.text}</Text>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
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
});

export default Post;
