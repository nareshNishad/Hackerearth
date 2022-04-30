import * as actionTypes from "../actions/actionsTypes";

const initialState = { 
    emiMonthly: 0,
    emiAmount: 0,
    emiExtra: 0
 }

 const resultReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_RESULTS:
            return {
                ...state,
                emiMonthly: action.emiMonthly,
                emiAmount: action.emiAmount,
                emiExtra: action.emiExtra
            }
        default:
            return state
    }
 }
 export default resultReducer;