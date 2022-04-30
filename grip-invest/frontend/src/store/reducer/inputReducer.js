import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  amount: 1000,
  interest: 10,
  tenure: 5,
};

export const inputReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AMOUNT:
      return {
        ...state,
        amount: action.amount,
      };
    case actionTypes.SET_INTEREST:
      return {
        ...state,
        interest: action.interest,
      };
    case actionTypes.SET_TENURE:
      return {
        ...state,
        tenure: action.tenure,
      };
    default:
      return state;
  }
};

export default inputReducer;
