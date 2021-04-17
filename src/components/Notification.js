import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-elements";

const Notification = ({ result, deleteRequest, acceptRequest }) => {
  return (
    <View style={{ marginTop: 7 }}>
      {result.notification_type === 1 ? (
        <View
          style={{
            backgroundColor: "#fff",
            marginHorizontal: 7,
            paddingBottom: 10,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: "#d3d3d3",
          }}
        >
          <View style={styles.container}>
            <Image
              style={styles.profilePicture}
              source={{ uri: result.sender.profile_picture }}
            />
            <View style={styles.userContainer}>
              <Text style={{ flex: 1, flexWrap: "wrap" }}>
                <Text style={styles.username}>{result.sender.user}</Text>
                <Text style={{ fontSize: 14 }}>
                  {" "}
                  sent you a friend request.{" "}
                </Text>
                <Text style={{ color: "#9f9f9f" }}>{result.timestamp}</Text>
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Button
              buttonStyle={{
                backgroundColor: "#a3ceff",
                paddingVertical: 5,
                marginHorizontal: 10,
              }}
              titleStyle={{ fontSize: 13, fontWeight: "bold" }}
              title="Confirm"
              onPress={() => acceptRequest(result.uuid)}
            />
            <Button
              buttonStyle={{ backgroundColor: "#FF878A", paddingVertical: 5 }}
              titleStyle={{ fontSize: 13, fontWeight: "bold" }}
              title="Delete"
              onPress={() => deleteRequest(result.uuid)}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    paddingLeft: 10,
    paddingVertical: 10,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderWidth: 0.5,
    borderColor: "#d3d3d3",
  },
  userContainer: {
    alignSelf: "center",
    marginLeft: 10,
    flexShrink: 1,
    flexDirection: "row",
  },
  username: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 1,
  },
});

export default Notification;
