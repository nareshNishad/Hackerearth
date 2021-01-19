import { reducer } from "../store/reducer";

export interface productObject {
  bookID: number;
  title: string;
  authors: string;
  average_rating: number;
  isbn: number;
  language_code: string;
  ratings_count: number;
  price: number;
}

export interface NotesState {
  cart: Array<productObject>;
}

export interface NotesOrder {
  order: Array<productObject>;
}

export type rootState = ReturnType<typeof reducer>;
