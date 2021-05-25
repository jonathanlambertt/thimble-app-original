import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const GroupPostsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        ListHeaderComponent={
          <TouchableOpacity
            onPress={() => navigation.navigate("GroupNewPostFlow")}
          >
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
                <FontAwesome5 name="paper-plane" size={20} color="black" />
                <Text
                  style={{
                    alignSelf: "center",
                    marginLeft: 7,
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
