import { NotesOrder } from "../../components/types";

export type Action = { type: "ORDER"; payload: NotesOrder };

export const orderList = (order: NotesOrder): Action => ({
  type: "ORDER",
  payload: order,
});
