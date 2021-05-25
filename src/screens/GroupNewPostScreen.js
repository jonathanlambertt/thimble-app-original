import React, { useState, useContext } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import { ButtonGroup, Input, Button } from "react-native-elements";
import { FontAwesome5, Feather, Entypo } from "@expo/vector-icons";
import { Context as GroupContext } from "../context/GroupContext";
import thimbleApi from "../api/thimble";

const GroupNewPostScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const { state } = useContext(GroupContext);

  const textOption = () => (
    <>
      {selectedIndex === 0 ? (
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Entypo name="text" size={19} color="#fff" />
          <Text
            style={{
              marginLeft: 5,
              alignSelf: "center",
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Text
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Entypo name="text" size={19} color="black" />
          <Text
            style={{ marginLeft: 5, alignSelf: "center", fontWeight: "bold" }}
          >
            Text
          </Text>
        </View>
      )}
    </>
  );
  const linkOption = () => (
    <>
      {selectedIndex === 1 ? (
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Feather name="link" size={19} color="#fff" />
          <Text
            style={{
              marginLeft: 5,
              alignSelf: "center",
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Link
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Feather name="link" size={19} color="black" />
          <Text
            style={{ marginLeft: 5, alignSelf: "center", fontWeight: "bold" }}
          >
            Link
          </Text>
        </View>
      )}
    </>
  );
  const photoOption = () => (
    <>
      {selectedIndex === 2 ? (
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <FontAwesome5 name="image" size={19} color="#fff" />
          <Text
            style={{
              marginLeft: 5,
              alignSelf: "center",
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Photo
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <FontAwesome5 name="image" size={19} color="black" />
          <Text
            style={{ marginLeft: 5, alignSelf: "center", fontWeight: "bold" }}
          >
            Photo
          </Text>
        </View>
      )}
    </>
  );
  const buttons = [
    { element: textOption },
    { element: linkOption },
    { element: photoOption },
  ];

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
          title="Post"
          type="clear"
          onPress={() => sendPost()}
        />
      ),
    });
  }, [navigation, selectedIndex, title, text, link]);

  const sendPost = async () => {
    switch (selectedIndex) {
      case 0:
        if (title) {
          try {
            const response = await thimbleApi.post("p/", {
              post_type: selectedIndex,
              title: title,
              text: text,
              group: state.group.uuid,
            });
            console.log(response.data);
          } catch (error) {
            console.log(error.response.data);
          }
        } else {
          try {
            const response = await thimbleApi.post("p/", {
              post_type: selectedIndex,
              text: text,
              group: state.group.uuid,
            });
            console.log(response.data);
          } catch (error) {
            console.log(error.response.data);
          }
        }
        return;
      case 1:
        console.log("link");
        return;
      default:
        return;
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{
          paddingLeft: 15,
          paddingRight: 15,
          fontSize: 17,
          paddingBottom: 7,
          paddingTop: 13,
        }}
        multiline
        placeholder="Title (optional)"
      ></TextInput>
      <ButtonGroup
        selectedButtonStyle={{ backgroundColor: "#A6A3FF" }}
        buttons={buttons}
        selectedIndex={selectedIndex}
        onPress={(index) => setSelectedIndex(index)}
      />
      {selectedIndex === 0 ? (
        <TextInput
          value={text}
          onChangeText={setText}
          multiline
          style={{
            paddingLeft: 15,
            paddingRight: 15,
            fontSize: 17,
            paddingBottom: 20,
          }}
          placeholder="Share something dope..."
        ></TextInput>
      ) : selectedIndex === 1 ? (
        <Input
          value={link}
          onChangeText={setLink}
          placeholder="Paste URL here"
        />
      ) : selectedIndex === 2 ? (
        <Text>photo</Text>
      ) : null}
    </ScrollView>
  );
};

export default GroupNewPostScreen;
