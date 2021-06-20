import React, { useState, useContext } from "react";
import { View, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Context as GroupContext } from "../context/GroupContext";
import thimbleApi from "../api/thimble";
import Post from "../components/Post";

const GroupPostsScreen = () => {
  const [results, setResults] = useState([]);
  const { state } = useContext(GroupContext);

  useFocusEffect(
    React.useCallback(() => {
      const fetchPosts = async () => {
        try {
          const response = await thimbleApi.get(
            `g/${state.group.group.uuid}/posts`
          );
          setResults(response.data);
        } catch (error) {}
      };

      fetchPosts();

      return () => {};
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={results}
        keyExtractor={(result) => result.uuid}
        renderItem={({ item }) => {
          return <Post post={item} />;
        }}
      />
    </View>
  );
};

export default GroupPostsScreen;
