import React, { useState, useContext } from "react";
import { View, Text, SafeAreaView } from "react-native";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import { Button } from "react-native-elements";

const ReactScreen = () => {
  const [reaction, setReaction] = useState("👍");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            backgroundColor: "#fff",
            paddingVertical: 20,
          }}
        >
          <Text>Pick an Emoji:</Text>
          <Text style={{ fontSize: 55 }}>{reaction}</Text>
        </View>
        <EmojiSelector
          category={Categories.emotion}
          onEmojiSelected={(emoji) => setReaction(emoji)}
          showSectionTitles={false}
          showSearchBar={false}
          columns={7}
        />
      </View>
      <Button
        titleStyle={{ fontSize: 16, fontWeight: "bold", marginRight: 10 }}
        buttonStyle={{
          borderRadius: 20,
          backgroundColor: "#A6A3FF",
        }}
        containerStyle={{
          paddingTop: 10,
          paddingHorizontal: 15,
        }}
        title="React"
      />
    </SafeAreaView>
  );
};

export default ReactScreen;
