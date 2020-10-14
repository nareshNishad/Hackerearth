export const initialState = {
  userTheme: true,
  userItem: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_THEME":
      return {
        ...state,
        userTheme: action.item,
      };
    case "ADD_ITEM":
      return {
        ...state,
        userItem: action.item,
      };
    default:
      return state;
  }
};

export default reducer;
