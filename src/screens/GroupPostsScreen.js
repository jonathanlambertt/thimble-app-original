import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const GroupPostsScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        ListHeaderComponent={
          <TouchableOpacity>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                borderWidth: 1.5,
                marginHorizontal: 5,
                marginVertical: 5,
                padding: 10,
                borderRadius: 4,
                borderColor: "#cecece",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Ionicons name="paper-plane-outline" size={24} color="black" />
                <Text
                  style={{
                    alignSelf: "center",
                    marginLeft: 5,
                    fontWeight: "500",
                  }}
                >
                  Post in group
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

export default GroupPostsScreen;
