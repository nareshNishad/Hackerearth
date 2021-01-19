import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NotesState, rootState } from "../types";

import "./header.css";

interface props {
  handleInput: (value: string) => void;
  inputBox: string;
}

const Index: React.FC<props> = ({ handleInput, inputBox }) => {
  const cart = useSelector((state: rootState): NotesState => state.cart);
  const history = useHistory();

  function handleClick(route: string) {
    history.push(`${route}`);
  }
  return (
    <div className="header_main">
      <img
        onClick={() => handleClick("/")}
        className="logo_image"
        src="https://cdn0.iconfinder.com/data/icons/education-340/100/Tilda_Icons_1ed_book-512.png"
        alt=""
      />
      <input
        placeholder="search book"
        className="input"
        value={inputBox}
        onChange={(e) => handleInput(e.target.value)}
      />
      <div>
        <Link to="/order" className="order_link">
          Orders
        </Link>
      </div>
      <div className="icon" onClick={() => handleClick("/cart")}>
        <FaShoppingCart size="2em" />
        <span className="count">
          {cart.cart?.length ? cart?.cart.length : null}
        </span>
      </div>
    </div>
  );
};

export default Index;
