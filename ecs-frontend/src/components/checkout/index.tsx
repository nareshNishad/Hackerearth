import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NotesState, rootState } from "../../components/types";
import Product from "../product";
import "./checkout.css";
import { orderList } from "../../store/action/order";
import { emptyCart } from "../../store/action/product";

const Index: React.FC = () => {
  const cart = useSelector((state: rootState): NotesState => state.cart);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const dispatch = useDispatch();
  useEffect(() => {
    setTotalPrice(cart.cart.reduce((a, b) => a + b["price"] || 0, 0));
  }, []);

  if (cart.cart.length === 0) {
    return <h2>Add Item in Cart</h2>;
  }

  function handleOrder() {
    dispatch(emptyCart());
    dispatch(orderList({ order: cart.cart }));
  }

  return (
    <div className="cart">
      <div>
        {cart.cart.map((product) => (
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

      <div className="checkout">
        <h4>Checkout details</h4>
        <div>
          Total Price: <span>{totalPrice}</span>
        </div>
        <div>
          Deliver at: <span>Alwar, Raj(301001)</span>
        </div>
        <button onClick={handleOrder}>Buy Now</button>
      </div>
    </div>
  );
};

export default Index;
