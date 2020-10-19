export const initialState = {
  userTheme: true,
  userItem: null,
};
console.log(initialState);
const reducer = (state, action) => {
  console.log({ action });
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
