import React, { useState, useContext, useLayoutEffect, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { Context as NewPostContext } from "../../context/NewPostContext";
import { Button, Input } from "react-native-elements";
import { Feather, FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
import { LinkPreview } from "@flyerhq/react-native-link-preview";
import * as Clipboard from "expo-clipboard";

const NewPostFlowPost = ({ navigation }) => {
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState(null);
  const [link, setLink] = useState("");
  const [linkErrorMessage, setLinkErrorMessage] = useState("");
  const [postIsDisabled, setPostIsDisabled] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [isLinkModalVisible, setIsLinkModalVisible] = useState(false);
  const { state } = useContext(NewPostContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          loading={isPosting}
          titleStyle={styles.postButtonTitle}
          buttonStyle={styles.postButton}
          title="Post"
          disabled={postIsDisabled}
          onPress={() => setIsPosting(true)}
        />
      ),
    });
  });

  // Enable/Disable post button when content is empty
  useEffect(() => {
    if (text.trim() == "" && photo == null && !isURL(link)) {
      setPostIsDisabled(true);
    } else {
      setPostIsDisabled(false);
    }
  }, [text, photo, link]);

  // Test if string is valid URL
  useEffect(() => {
    if (!link.trim() == "") {
      if (isURL(link)) {
        setIsLinkModalVisible(false);
        setPhoto(null);
        setLinkErrorMessage("");
      } else {
        setLinkErrorMessage("Please enter a valid URL.");
      }
    }
  }, [link]);

  const isURL = (str) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  };

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
          setLink("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const pasteFromClipboard = async () => {
    const text = await Clipboard.getStringAsync();
    setLink(text);
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
      {isURL(link) ? (
        <LinkPreview containerStyle={styles.linkPreview} text={link} />
      ) : null}
      <KeyboardAccessoryView
        avoidKeyboard
        style={{ backgroundColor: "#fff" }}
        alwaysVisible={true}
        heightProperty="minHeight"
        hideBorder
      >
        <View style={styles.mediaPickerContainer}>
          <TouchableOpacity
            style={styles.mediaPicker}
            onPress={() => setIsLinkModalVisible(true)}
          >
            <Feather name="link" size={22} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mediaPicker} onPress={selectPhoto}>
            <FontAwesome name="image" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </KeyboardAccessoryView>
      <Modal visible={isLinkModalVisible} transparent animationType="slide">
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ alignSelf: "flex-end" }}>
              <Button
                icon={<Feather name="x-circle" size={22} color="#333" />}
                onPress={() => setIsLinkModalVisible(false)}
                type="clear"
              />
            </View>
            <Input
              placeholder="Paste URL here"
              selectionColor={"#ff878a"}
              value={link}
              onChangeText={setLink}
              errorMessage={linkErrorMessage}
            />
            <Button
              title="paste from clipboard"
              type="clear"
              titleStyle={{ color: "#A6A3FF", fontWeight: "bold" }}
              onPress={() => pasteFromClipboard()}
            />
          </View>
        </View>
      </Modal>
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
    paddingLeft: 15,
    paddingRight: 15,
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
    width: 60,
    height: 30,
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
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 8,
    paddingBottom: 35,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d3d3d3",
  },
  linkPreview: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginHorizontal: 15,
    marginVertical: 10,
  },
});

export default NewPostFlowPost;
