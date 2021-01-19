import { Action } from "../action/order";
import { NotesOrder } from "../../components/types";

const initialState = {
  order: [],
};

export const order = (
  state: NotesOrder = initialState,
  action: Action
): NotesOrder => {
  switch (action.type) {
    case "ORDER": {
      return {
        ...state,
        order: [...state.order, ...action.payload.order],
      };
    }
    default:
      return state;
  }
};
