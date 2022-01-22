import React, { useState, useContext, useLayoutEffect, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { Context as NewPostContext } from "../../context/NewPostContext";
import { Button } from "react-native-elements";
import { Feather, FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";

const NewPostFlowPost = ({ navigation }) => {
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const { state } = useContext(NewPostContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          titleStyle={styles.postButtonTitle}
          buttonStyle={styles.postButton}
          title="Post"
          disabled={isDisabled}
        />
      ),
    });
  });

  // Enable/Disable post button when content is empty
  useEffect(() => {
    if (text == "" && photo == null) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [text, photo]);

  const selectPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.cancelled) {
      let baseWidth = 1080;
      let scaleFactor = baseWidth / result.width;
      let newHeight = result.height * scaleFactor;

      await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: { width: baseWidth, height: newHeight } }],
        { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
      )
        .then((response) => {
          setPhoto(response.uri);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <Text style={styles.postingText}>
        Posting to {""}
        <Text style={{ fontWeight: "bold" }}>{state.group.group.name}</Text>
      </Text>
      <TextInput
        value={text}
        onChangeText={setText}
        autoFocus={true}
        multiline
        style={styles.textInput}
        placeholder="Share something..."
        selectionColor={"#ff878a"}
      ></TextInput>
      {photo ? <Image source={{ uri: photo }} style={styles.photo} /> : null}
      <KeyboardAccessoryView
        avoidKeyboard
        style={{ backgroundColor: "#fff" }}
        alwaysVisible={true}
        heightProperty="minHeight"
        hideBorder
      >
        <View style={styles.mediaPickerContainer}>
          <TouchableOpacity style={styles.mediaPicker}>
            <Feather name="link" size={22} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mediaPicker} onPress={selectPhoto}>
            <FontAwesome name="image" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </KeyboardAccessoryView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  postingText: {
    fontSize: 20,
    marginLeft: 15,
    marginTop: 15,
  },
  textInput: {
    fontSize: 18,
    paddingBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
  },
  postButtonTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  postButton: {
    backgroundColor: "#A6A3FF",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 10,
  },
  mediaPicker: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: "#d3d3d3",
    marginLeft: 15,
    marginBottom: 10,
  },
  mediaPickerContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  photo: {
    alignSelf: "center",
    width: 250,
    height: 250,
    borderWidth: 0.5,
    borderColor: "#d3d3d3",
    borderRadius: 8,
  },
});

export default NewPostFlowPost;
