import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";

const Reaction = ({ reaction }) => {
  return (
    <View style={styles.container}>
      {reaction.owner.profile_picture ? (
        <Avatar
          containerStyle={{
            borderWidth: 0.5,
            borderColor: "#d3d3d3",
          }}
          rounded
          icon={{
            name: "user",
            type: "feather",
            color: "#333",
          }}
          size={18}
          source={{
            uri: reaction.owner.profile_picture,
          }}
        />
      ) : (
        <Avatar
          containerStyle={{
            borderWidth: 0.5,
            borderColor: "#d3d3d3",
          }}
          rounded
          icon={{
            name: "user",
            type: "feather",
            color: "#333",
          }}
          size={18}
        />
      )}
      <Text style={{ marginLeft: 2 }}>:</Text>
      <Text style={styles.reactionEmoji}>{reaction.reaction}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    borderRadius: 5,
    paddingHorizontal: 3,
    paddingVertical: 3,
  },
  reactionEmoji: {
    alignSelf: "center",
    fontSize: 11,
    marginLeft: 1,
  },
});

export default Reaction;
