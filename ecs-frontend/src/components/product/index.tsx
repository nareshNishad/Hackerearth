import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "./product.css";
import { productObject } from "../types";
import { addCart, removeCart } from "../../store/action/product";
// import "font-awesome/css/font-awesome.min.css";

interface props extends productObject {
  show: boolean;
}

const Index: React.FC<props> = ({
  bookID,
  title,
  authors,
  average_rating,
  isbn,
  language_code,
  ratings_count,
  price,
  show,
}) => {
  const dispatch = useDispatch();
  const [change, setChange] = useState(false);

  const addProduct = () => {
    dispatch(
      addCart({
        bookID,
        title,
        authors,
        average_rating,
        isbn,
        language_code,
        ratings_count,
        price,
      })
    );
    setChange(true);
  };

  const removeProduct = () => {
    dispatch(
      removeCart({
        bookID,
        title,
        authors,
        average_rating,
        isbn,
        language_code,
        ratings_count,
        price,
      })
    );
    setChange(false);
  };

  return (
    <div className="product" key={bookID}>
      <h3>{title}</h3>
      <div className="details">
        <div>
          Author:
          <span>{authors}</span>
        </div>
        <div>
          ISBN no: &nbsp; <span>{isbn}</span>
        </div>
        <div>
          Language: &nbsp; <span>{language_code}</span>
        </div>
        <div className="star_rating">
          Rating:
          {/* <span>{average_rating}</span>&nbsp; by &nbsp;{" "} */}
          <div className="stars-outer">
            <div
              className="stars-inner"
              style={{
                width: `${Math.round((average_rating / 5) * 100)}%`,
              }}
            ></div>
          </div>
          <span>by &nbsp;</span>
          <span>{ratings_count}</span>, &nbsp; users
        </div>
        <div>
          Price: &nbsp;
          <span>{price} ₹</span>
        </div>
      </div>
      {show ? (
        !change ? (
          <button onClick={addProduct}>Add to cart</button>
        ) : (
          <button onClick={removeProduct}>Remove From cart</button>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default Index;
