import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
  switch (action.type) {
    case "set_user":
      return { user: action.payload };
    default:
      return state;
  }
};

const setUser =
  (dispatch) =>
  async ({ user }) => {
    dispatch({ type: "set_user", payload: user });
  };

export const { Provider, Context } = createDataContext(
  authReducer,
  { setUser },
  { user: null }
);
