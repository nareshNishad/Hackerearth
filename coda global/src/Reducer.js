export const initialState = {
  users: [],
  betNo: null,
};

export const actionTypes = {
  ADD_USER: "ADD_USER",
  BET_NUM: "BET_NUM",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, users: action.item };
    case "BET_NUM":
      return { ...state, betNo: action.item };
    default:
      return state;
  }
};

export default reducer;
