import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  Platform,
} from "react-native";
import { ButtonGroup, Input, Button } from "react-native-elements";
import { FontAwesome5, Feather, Entypo } from "@expo/vector-icons";
import { Context as GroupContext } from "../context/GroupContext";
import thimbleApi from "../api/thimble";
import * as ImagePicker from "expo-image-picker";
import FormData from "form-data";
import * as ImageManipulator from "expo-image-manipulator";

const GroupNewPostScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [disable, setDisable] = useState(false);
  const { state } = useContext(GroupContext);
  const baseWidth = 1080;

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
          disabled={disable}
          title="Post"
          type="clear"
          onPress={() => {
            sendPost(image);
            setDisable(true);
          }}
        />
      ),
    });
  }, [navigation, selectedIndex, title, text, link, disable, image]);

  const sendPost = async (image) => {
    switch (selectedIndex) {
      case 0:
        if (title) {
          try {
            await thimbleApi.post("p/", {
              post_type: String(selectedIndex),
              title: title,
              text: text,
              group: state.group.uuid,
            });
            navigation.navigate("GroupDetail");
          } catch (error) {
            let errorStr = "";

            for (const prop in error.response.data) {
              errorStr += `${prop} - ${error.response.data[prop][0]}\n`;
            }

            setErrorMessage(errorStr);
            setDisable(false);
          }
        } else {
          try {
            await thimbleApi.post("p/", {
              post_type: String(selectedIndex),
              text: text,
              group: state.group.uuid,
            });
            navigation.navigate("GroupDetail");
          } catch (error) {
            let errorStr = "";

            for (const prop in error.response.data) {
              errorStr += `${prop} - ${error.response.data[prop][0]}\n`;
            }

            setErrorMessage(errorStr);
            setDisable(false);
          }
        }
        return;
      case 1:
        if (title) {
          try {
            await thimbleApi.post("p/", {
              post_type: String(selectedIndex),
              title: title,
              link: link,
              group: state.group.uuid,
            });
            navigation.navigate("GroupDetail");
          } catch (error) {
            let errorStr = "";

            for (const prop in error.response.data) {
              errorStr += `${prop} - ${error.response.data[prop][0]}\n`;
            }

            setErrorMessage(errorStr);
            setDisable(false);
          }
        } else {
          try {
            await thimbleApi.post("p/", {
              post_type: String(selectedIndex),
              link: link,
              group: state.group.uuid,
            });
            navigation.navigate("GroupDetail");
          } catch (error) {
            let errorStr = "";

            for (const prop in error.response.data) {
              errorStr += `${prop} - ${error.response.data[prop][0]}\n`;
            }

            setErrorMessage(errorStr);
            setDisable(false);
          }
        }
        return;
      case 2:
        let data = new FormData();
        {
          image
            ? data.append("photo", {
                uri:
                  Platform.OS === "android"
                    ? image
                    : image.replace("file://", ""),
                name: "image.jpeg",
                type: "image/jpg",
              })
            : null;
        }
        data.append("post_type", String(selectedIndex));
        data.append("group", state.group.uuid);

        if (title) {
          data.append("title", title);
          try {
            await thimbleApi.post("p/", data, {
              headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
              },
            });
            navigation.navigate("GroupDetail");
          } catch (error) {
            let errorStr = "";

            for (const prop in error.response.data) {
              errorStr += `${prop} - ${error.response.data[prop][0]}\n`;
            }

            setErrorMessage(errorStr);
            setDisable(false);
          }
        } else {
          try {
            await thimbleApi.post("p/", data, {
              headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
              },
            });
            navigation.navigate("GroupDetail");
          } catch (error) {
            let errorStr = "";

            for (const prop in error.response.data) {
              errorStr += `${prop} - ${error.response.data[prop][0]}\n`;
            }

            setErrorMessage(errorStr);
            setDisable(false);
          }
        }
        return;
      default:
        return;
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.cancelled) {
      let scaleFactor = baseWidth / result.width;
      let newHeight = result.height * scaleFactor;

      await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: { width: baseWidth, height: newHeight } }],
        { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
      )
        .then((response) => {
          setImage(response.uri);
        })
        .catch((err) => {
          console.log(err);
        });
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
        <View>
          <Button
            titleStyle={{
              fontSize: 15,
              fontWeight: "bold",
              marginRight: 10,
              color: "#A6A3FF",
            }}
            title="Choose a Photo"
            type="clear"
            onPress={pickImage}
          />
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                alignSelf: "center",
                width: 250,
                height: 250,
                borderWidth: 1,
                borderColor: "#d3d3d3",
                borderRadius: 4,
              }}
            />
          )}
        </View>
      ) : null}
      {errorMessage ? (
        <Text
          style={{
            textAlign: "center",
            marginTop: 5,
            color: "red",
          }}
        >
          {errorMessage}
        </Text>
      ) : null}
    </ScrollView>
  );
};

export default GroupNewPostScreen;
