import React, { useState } from "react";
import { View, Text } from "react-native";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import { Button } from "react-native-elements";

const ReactScreen = ({ navigation }) => {
  const [reaction, setReaction] = useState("");
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          titleStyle={{
            fontSize: 15,
            fontWeight: "bold",
            marginRight: 10,
            color: "#A6A3FF",
          }}
          title="Share"
          type="clear"
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#fff",
          paddingVertical: 20,
        }}
      >
        <Text>Pick an Emoji:</Text>
        <Text style={{ fontSize: 50 }}>{reaction}</Text>
      </View>
      <EmojiSelector
        category={Categories.emotion}
        onEmojiSelected={(emoji) => setReaction(emoji)}
        showSectionTitles={false}
        showTabs={false}
        placeholder="Search for an emoji"
        columns={8}
      />
    </View>
  );
};

export default ReactScreen;
