export const initialState = {
  userTheme: true,
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

    default:
      return state;
  }
};

export default reducer;
