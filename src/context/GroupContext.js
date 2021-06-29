import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
  switch (action.type) {
    case "set_group":
      return { group: action.payload };
    case "set_group_was_created":
      return { groupWasCreated: action.payload };
    default:
      return state;
  }
};

const setGroup =
  (dispatch) =>
  async ({ group }) => {
    dispatch({ type: "set_group", payload: group });
  };

const setGroupWasCreated =
  (dispatch) =>
  async ({ value }) => {
    dispatch({ type: "set_group_was_created", payload: value });
  };

export const { Provider, Context } = createDataContext(
  authReducer,
  { setGroup, setGroupWasCreated },
  { group: null, groupWasCreated: false }
);
