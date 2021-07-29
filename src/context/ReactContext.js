import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
  switch (action.type) {
    case "set_update_reaction_data_func":
      return { updateReactionData: action.payload };
    case "set_post_id":
      return { ...state, postId: action.payload };
    default:
      return state;
  }
};

const setUpdateReactionDataFunc =
  (dispatch) =>
  async ({ f }) => {
    dispatch({ type: "set_update_reaction_data_func", payload: f });
  };

const setPostId =
  (dispatch) =>
  async ({ id }) => {
    dispatch({ type: "set_post_id", payload: id });
  };

export const { Provider, Context } = createDataContext(
  authReducer,
  { setUpdateReactionDataFunc, setPostId },
  { postId: null, updateReactionData: null }
);
