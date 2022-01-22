import React, { useState, useContext, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Avatar, Button, Input } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import FormData from "form-data";
import * as ImageManipulator from "expo-image-manipulator";
import { Context as UserContext } from "../../context/UserContext";
import thimbleApi from "../../api/thimble";

const EditProfileScreen = ({ navigation }) => {
  const [newImage, setNewImage] = useState(null);
  const [fullName, setFullName] = useState("");
  const [disable, setDisable] = useState(false);
  const baseWidth = 1080;
  const { state } = useContext(UserContext);

  useEffect(() => {
    const setFullNameField = navigation.addListener("focus", async () => {
      setFullName(state.user.full_name);
    });

    return setFullNameField;
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
            updateProfile();
            setDisable(true);
          }}
          title="Save"
          type="clear"
        />
      ),
    });
  }, [navigation, newImage, fullName, disable]);

  const updateProfile = async () => {
    if (newImage == null && fullName == state.user.full_name) {
      navigation.navigate("Profile");
    } else {
      let data = new FormData();
      {
        newImage
          ? data.append("profile_picture", {
              uri:
                Platform.OS === "android"
                  ? newImage
                  : newImage.replace("file://", ""),
              name: "image.jpeg",
              type: "image/jpg",
            })
          : null;
      }
      {
        fullName !== state.user.full_name
          ? data.append("full_name", fullName)
          : null;
      }

      try {
        await thimbleApi.put("u/edit", data);
        navigation.navigate("Profile");
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
          setNewImage(response.uri);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <ScrollView>
      <View style={{ alignItems: "center", marginTop: 25 }}>
        {newImage ? (
          <Avatar
            containerStyle={{
              borderWidth: 0.5,
              borderColor: "#d3d3d3",
            }}
            rounded
            icon={{ name: "user", type: "feather", color: "#333" }}
            size={80}
            source={{
              uri: newImage,
            }}
          />
        ) : state.user.profile_picture ? (
          <Avatar
            containerStyle={{
              borderWidth: 0.5,
              borderColor: "#d3d3d3",
            }}
            rounded
            icon={{ name: "user", type: "feather", color: "#333" }}
            size={80}
            source={{
              uri: state.user.profile_picture,
            }}
          />
        ) : (
          <Avatar
            containerStyle={{
              borderWidth: 0.5,
              borderColor: "#d3d3d3",
            }}
            rounded
            icon={{ name: "user", type: "feather", color: "#333" }}
            size={80}
          />
        )}
        <Button
          titleStyle={{
            fontSize: 15,
            fontWeight: "bold",
            marginRight: 10,
            color: "#A6A3FF",
            marginBottom: 10,
          }}
          title="Change Profile Picture"
          type="clear"
          onPress={pickImage}
        />
        <Input
          inputContainerStyle={{ marginHorizontal: 15 }}
          placeholder="Full name"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;
