import React from "react";
import "./card.modules.css";

function Card(props) {
  return (
    <div className="cardMain">
      <img
        className="cardImage"
        src={props.image}
        loading="lazy"
        alt="image"
        width="500"
        height="600"
      ></img>
      <div className="cardData">
        <div>
          <h2>
            {" "}
            <span>Name:</span>
            {props.data.name}
          </h2>
        </div>
        <div>
          <h2>
            {" "}
            <span>Abv:</span>
            {props.data.abv}
          </h2>
        </div>
        <div>
          <h2>
            {" "}
            <span>Ibu:</span>
            {props.data.ibu}
          </h2>
        </div>
        <div>
          <h2>
            <span>Style:</span>
            {props.data.style}
          </h2>
        </div>
        <div>
          <h2>
            <span>Ounces:</span>
            {props.data.ounces}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Card;
