import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import { Input, Button } from "react-native-elements";
import thimbleApi from "../api/thimble";

const NewGroupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disable, setDisable] = useState(false);

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
            createGroup(name, description);
            setDisable(true);
          }}
          title="Create"
          type="clear"
        />
      ),
    });
  }, [navigation, name, description, disable]);

  const createGroup = async (group_name, group_desc) => {
    try {
      if (description) {
        await thimbleApi.post("g/", {
          name: group_name,
          description: group_desc,
        });
      } else {
        await thimbleApi.post("g/", { name: group_name });
      }

      navigation.navigate("Groups", { screen: "Created" });
    } catch (error) {
      let errorStr = "";

      for (const prop in error.response.data) {
        errorStr += `${prop} - ${error.response.data[prop][0]}\n`;
      }

      setErrorMessage(errorStr);
      setDisable(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, paddingTop: 15, backgroundColor: "#fff" }}>
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
      </View>
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
