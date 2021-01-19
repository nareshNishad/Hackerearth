import React from "react";
import { useSelector } from "react-redux";
import { rootState, NotesOrder } from "../../components/types";
import Product from "../product";

const Index: React.FC = () => {
  const order = useSelector((state: rootState): NotesOrder => state.order);

  if (order.order.length === 0) {
    return <h2>No Previous order</h2>;
  }

  return (
    <div className="cart">
      {order.order.map((product) => (
        <Product
          key={product.bookID}
          bookID={product.bookID}
          title={product.title}
          authors={product.authors}
          average_rating={product.average_rating}
          isbn={product.isbn}
          language_code={product.language_code}
          ratings_count={product.ratings_count}
          price={product.price}
          show={false}
        />
      ))}
    </div>
  );
};

export default Index;
