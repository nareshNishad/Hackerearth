import { productObject } from "../../components/types";

export type Action = {
  type: "ADD_CART" | "REMOVE_CART" | "EMPTY_CART";
  payload: productObject | [];
};

export const addCart = (cart: productObject): Action => ({
  type: "ADD_CART",
  payload: cart,
});

export const removeCart = (cart: productObject): Action => ({
  type: "REMOVE_CART",
  payload: cart,
});

export const emptyCart = (): Action => ({
  type: "EMPTY_CART",
  payload: [],
});
