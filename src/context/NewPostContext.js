import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
  switch (action.type) {
    case "set_group":
      return { group: action.payload };
    default:
      return state;
  }
};

const setGroup =
  (dispatch) =>
  async ({ group }) => {
    dispatch({ type: "set_group", payload: group });
  };

export const { Provider, Context } = createDataContext(
  authReducer,
  { setGroup },
  { group: null }
);
