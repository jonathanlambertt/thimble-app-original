import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import { Input, Button, Avatar } from "react-native-elements";
import thimbleApi from "../../api/thimble";
import * as ImagePicker from "expo-image-picker";
import FormData from "form-data";
import * as ImageManipulator from "expo-image-manipulator";
import { Context as GroupContext } from "../../context/GroupContext";

const NewGroupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [disable, setDisable] = useState(false);
  const { setGroupWasCreated } = useContext(GroupContext);
  const baseWidth = 1080;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          titleStyle={{
            fontSize: 15,
            fontWeight: "bold",
            marginRight: 5,
            color: "#A6A3FF",
          }}
          disabled={disable}
          onPress={() => {
            createGroup(name, description, banner);
            setDisable(true);
          }}
          title="Create"
          type="clear"
        />
      ),
    });
  }, [navigation, name, description, disable, banner]);

  const createGroup = async (group_name, group_desc, bannerPhoto) => {
    let data = new FormData();
    {
      bannerPhoto
        ? data.append("banner", {
            uri:
              Platform.OS === "android"
                ? bannerPhoto
                : bannerPhoto.replace("file://", ""),
            name: "image.jpeg",
            type: "image/jpg",
          })
        : null;
    }
    data.append("name", group_name);

    if (description) {
      data.append("description", group_desc);
      try {
        await thimbleApi.post("g/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        });

        navigation.navigate("Groups", { screen: "Created" });
        setGroupWasCreated({ value: true });
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
        await thimbleApi.post("g/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        });

        navigation.navigate("Groups", { screen: "Created" });
        setGroupWasCreated({ value: true });
      } catch (error) {
        let errorStr = "";

        for (const prop in error.response.data) {
          errorStr += `${prop} - ${error.response.data[prop][0]}\n`;
        }

        setErrorMessage(errorStr);
        setDisable(false);
      }
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
          setBanner(response.uri);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={{ flex: 1, paddingTop: 15, backgroundColor: "#fff" }}>
        <Avatar
          containerStyle={{
            borderWidth: 0.5,
            borderColor: "#d3d3d3",
            alignSelf: "center",
          }}
          rounded
          icon={{ name: "image", type: "feather", color: "#333" }}
          size={80}
          source={{ uri: banner }}
        />
        <Button
          titleStyle={{
            fontSize: 15,
            fontWeight: "bold",
            marginRight: 10,
            color: "#A6A3FF",
            marginBottom: 10,
          }}
          title="Choose a Banner"
          type="clear"
          onPress={pickImage}
        />
        <Input
          value={name}
          onChangeText={setName}
          placeholder="Group name"
          inputStyle={styles.nameInput}
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />
        <TextInput
          onChangeText={setDescription}
          style={styles.descriptionInput}
          multiline={true}
          placeholderTextColor="#9a9a9a"
          numberOfLines={5}
          placeholder="Group description (optional)"
        />
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
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  nameInput: {
    backgroundColor: "#f4f4f4",
    borderWidth: 1,
    borderColor: "#cecece",
    borderRadius: 4,
    paddingLeft: 12,
    paddingVertical: 14,
    marginBottom: -15,
    marginHorizontal: 10,
  },
  descriptionInput: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#cecece",
    borderRadius: 4,
    height: 100,
    paddingLeft: 11,
    paddingTop: 12,
    backgroundColor: "#f4f4f4",
    fontSize: 15,
  },
});

export default NewGroupScreen;
