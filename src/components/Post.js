import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
  FlatList,
} from "react-native";
import PhotoThumbnail from "../components/PhotoThumbnail";
import { LinkPreview } from "@flyerhq/react-native-link-preview";
import { Entypo, Feather } from "@expo/vector-icons";
import * as RootNavigation from "../../src/RootNavigation";
import { Context as ReactContext } from "../context/ReactContext";
import thimbleApi from "../api/thimble";

const Post = ({ post }) => {
  const { setUpdateReactionDataFunc, setPostId } = useContext(ReactContext);
  const [recentReactions, setRecentReactions] = useState(
    post.reactions.newest_three
  );
  const [reactionsCount, setReactionsCount] = useState(
    post.reactions.total_reactions
  );

  const updateReactionsData = async () => {
    try {
      const response = await thimbleApi.get(`r/${post.post.uuid}`);
      setReactionsCount(response.data.total_reactions);
      setRecentReactions(response.data.newest_three);
    } catch (error) {}
  };

  const onShare = async () => {
    if (post.post.post_type == 0) {
      try {
        const result = await Share.share({ message: post.post.text });
      } catch (error) {
        alert(error.message);
      }
    }
    if (post.post.post_type == 1) {
      try {
        const result = await Share.share({
          message: "Link from Thimble",
          url: post.post.link,
        });
      } catch (error) {
        alert(error.message);
      }
    }
    if (post.post.post_type == 2) {
      try {
        const result = await Share.share({
          message: "Photo from Thimble",
          url: post.post.photo,
        });
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {post.post.owner.profile_picture ? (
          <PhotoThumbnail
            uri={post.post.owner.profile_picture}
            width={37}
            height={37}
          />
        ) : (
          <PhotoThumbnail width={37} height={37} />
        )}
        <View style={styles.headerTextContainer}>
          <Text style={{ flex: 1, flexWrap: "wrap" }}>
            <Text style={{ fontWeight: "700" }}>{post.post.owner.user}</Text>
            <Text> posted in </Text>
            <Text style={{ fontWeight: "700" }}>{post.post.group.name} </Text>
            <Text style={{ color: "#9f9f9f", fontWeight: "600" }}>
              {post.post.timestamp}
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.postContent}>
        {post.post.title ? (
          <Text
            style={{
              fontSize: 17,
              marginBottom: 8,
              fontWeight: "500",
              marginTop: -3,
            }}
          >
            {post.post.title}
          </Text>
        ) : null}
        {post.post.post_type === 0 ? (
          <Text style={{ fontSize: 16, marginTop: -4 }}>{post.post.text}</Text>
        ) : post.post.post_type === 1 ? (
          <LinkPreview
            containerStyle={{
              backgroundColor: "#f5f5f5",
              borderRadius: 4,
            }}
            text={post.post.link}
          />
        ) : post.post.post_type === 2 ? (
          <Image
            style={{
              aspectRatio: 1,
              borderRadius: 3,
              borderWidth: 0.5,
              borderColor: "#d3d3d3",
            }}
            source={{ uri: post.post.photo }}
          />
        ) : null}
        {reactionsCount === 0 ? null : (
          <View
            style={{
              flexDirection: "row",
              marginTop: 4,
            }}
          >
            {reactionsCount == 0 ? null : reactionsCount == 1 ? (
              <Text style={{ marginTop: 5, fontWeight: "500", fontSize: 14 }}>
                {reactionsCount} reaction -
              </Text>
            ) : (
              <Text style={{ marginTop: 5, fontWeight: "500", fontSize: 14 }}>
                {reactionsCount} reactions -
              </Text>
            )}
            {recentReactions.length === 0 ? null : (
              <View style={{ marginTop: 3 }}>
                <FlatList
                  data={recentReactions}
                  horizontal={true}
                  keyExtractor={(item) => item.owner.profile_picture}
                  renderItem={({ item }) => {
                    return (
                      <View style={{ marginLeft: 6, flexDirection: "row" }}>
                        <PhotoThumbnail
                          uri={item.owner.profile_picture}
                          width={20}
                          height={20}
                        />
                        <Text>:</Text>
                        <Text style={{ alignSelf: "center" }}>
                          {item.reaction}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
            )}
          </View>
        )}
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
            setUpdateReactionDataFunc({ f: updateReactionsData });
            RootNavigation.navigate("ReactFlow");
            setPostId({ id: post.post.uuid });
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
