import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import thimbleApi from "../api/thimble";
import * as RootNavigation from "../../src/RootNavigation";

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { errorMessage: "", token: action.payload, isLoading: false };
    case "logout":
      return { ...state, token: null };
    case "set_loading_false":
      return { ...state, isLoading: false };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

// Post signup data and navigate to login screen
const signup = (dispatch) => async ({
  username,
  email,
  password,
  full_name,
}) => {
  try {
    if (full_name) {
      await thimbleApi.post("/u/", {
        username,
        email,
        password,
        full_name,
      });
    } else {
      await thimbleApi.post("/u/", {
        username,
        email,
        password,
      });
    }

    RootNavigation.navigate("SignupSuccess");
  } catch (error) {
    let errorStr = "";

    // Concatenate error messages for displaying
    for (const prop in error.response.data) {
      errorStr += `${prop} - ${error.response.data[prop][0]}\n`;
    }

    dispatch({ type: "add_error", payload: errorStr });
  }
};

// Post login data then set token
const login = (dispatch) => async ({ username, password }) => {
  try {
    const response = await thimbleApi.post("/u/login", {
      username,
      password,
    });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "login", payload: response.data.token });
  } catch (error) {
    dispatch({
      type: "add_error",
      payload: "Please ensure your username and password are correct.",
    });
  }
};

const logout = (dispatch) => async () => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (error) {}
  dispatch({ type: "logout" });
};

const setLoadingFalse = (dispatch) => () => {
  dispatch({ type: "set_loading_false" });
};

const setToken = (dispatch) => (token) => {
  dispatch({ type: "login", payload: token });
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, login, logout, setLoadingFalse, setToken, clearErrorMessage },
  { token: null, errorMessage: "", isLoading: true }
);
