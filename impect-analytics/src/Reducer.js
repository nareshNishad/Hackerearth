export const initialState = {
  selected: [],
  rejected: [],
};
export const actionTypes = {
  SELECT_USER: "SELECT_USER",
  REJECT_USER: "REJECT_USER",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT_USER":
      if (
        state.selected.find((candidate) => {
          return candidate.id === action.item.id;
        }) !== undefined
      )
        return state;

      return { ...state, selected: [...state.selected, action.item] };

    case "REJECT_USER":
      if (
        state.rejected.find((candidate) => {
          return candidate.id === action.item.id;
        }) !== undefined
      )
        return state;
      return { ...state, rejected: [...state.rejected, action.item] };
    default:
      return state;
  }
};

export default reducer;
