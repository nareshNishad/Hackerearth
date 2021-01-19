import { Action } from "../action/product";
import { NotesState, productObject } from "../../components/types";

const initialState = {
  cart: [],
};

export const cart = (
  state: NotesState = initialState,
  action: Action
): NotesState => {
  switch (action.type) {
    case "ADD_CART": {
      return {
        ...state,
        cart: [...state.cart, action.payload as productObject],
      };
    }
    case "REMOVE_CART": {
      return {
        ...state,
        cart: state.cart.filter((product) => {
          return product.bookID !== (action.payload as productObject).bookID;
        }),
      };
    }
    case "EMPTY_CART": {
      return { ...state, cart: [] };
    }
    default:
      return state;
  }
};
