import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
  switch (action.type) {
    case "set_update_reaction_data_func":
      return { updateReactionData: action.payload };
    default:
      return state;
  }
};

const setUpdateReactionData =
  (dispatch) =>
  async ({ f }) => {
    dispatch({ type: "set_update_reaction_data_func", payload: f });
  };

export const { Provider, Context } = createDataContext(
  authReducer,
  { setUpdateReactionData },
  { updateReactionData: null }
);
