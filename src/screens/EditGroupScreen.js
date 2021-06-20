import React, { useState, useEffect, useContext } from "react";
import {
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  View,
  Platform,
} from "react-native";
import { Context as GroupContext } from "../context/GroupContext";
import { Input, Button, Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import FormData from "form-data";
import * as ImageManipulator from "expo-image-manipulator";
import thimbleApi from "../api/thimble";

const EditGroupScreen = ({ navigation }) => {
  const [newBanner, setNewBanner] = useState(null);
  const [description, setDescription] = useState("");
  const [disable, setDisable] = useState(false);
  const baseWidth = 1080;
  const { state } = useContext(GroupContext);

  useEffect(() => {
    const setDescriptionField = navigation.addListener("focus", async () => {
      setDescription(state.group.group.description);
    });

    return setDescriptionField;
  }, [navigation]);

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
          onPress={() => {
            updateGroup();
            setDisable(true);
          }}
          title="Save"
          type="clear"
        />
      ),
    });
  }, [navigation, newBanner, description, disable]);

  const updateGroup = async () => {
    if (newBanner == null && description == state.group.group.description) {
      navigation.navigate("GroupDetail");
    } else {
      let data = new FormData();
      {
        newBanner
          ? data.append("banner", {
              uri:
                Platform.OS === "android"
                  ? newBanner
                  : newBanner.replace("file://", ""),
              name: "image.jpeg",
              type: "image/jpg",
            })
          : null;
      }
      {
        description !== state.group.group.description
          ? data.append("description", description)
          : null;
      }

      try {
        await thimbleApi.put(`g/${state.group.group.uuid}/edit`, data);
        navigation.navigate("Groups");
      } catch (error) {}
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
          setNewBanner(response.uri);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <View style={{ alignItems: "center", marginTop: 25 }}>
          {newBanner ? (
            <Avatar
              containerStyle={{
                borderWidth: 0.5,
                borderColor: "#d3d3d3",
              }}
              rounded
              icon={{ name: "user", type: "feather", color: "#333" }}
              size={80}
              source={{
                uri: newBanner,
              }}
            />
          ) : state.group.group.banner ? (
            <Avatar
              containerStyle={{
                borderWidth: 0.5,
                borderColor: "#d3d3d3",
              }}
              rounded
              icon={{ name: "user", type: "feather", color: "#333" }}
              size={80}
              source={{
                uri: state.group.group.banner,
              }}
            />
          ) : (
            <Avatar
              containerStyle={{
                borderWidth: 0.5,
                borderColor: "#d3d3d3",
              }}
              rounded
              icon={{ name: "image", type: "feather", color: "#333" }}
              size={80}
            />
          )}
        </View>
        <Button
          titleStyle={{
            fontSize: 15,
            fontWeight: "bold",
            marginRight: 10,
            color: "#A6A3FF",
            marginBottom: 10,
          }}
          title="Change Banner"
          type="clear"
          onPress={pickImage}
        />
        <Input
          inputContainerStyle={{ marginHorizontal: 15 }}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default EditGroupScreen;
