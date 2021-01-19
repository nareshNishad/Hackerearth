import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Product from "../product";
import { productObject } from "../../components/types";
import "./main.css";

interface countObject {
  prev: number;
  next: number;
}
interface props {
  inputBox: string;
}

const Index: React.FC<props> = ({ inputBox }) => {
  const [data, setData] = useState<Array<productObject>>([]);

  // Infinite scroll code
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [count, setCount] = useState<countObject>({
    prev: 0,
    next: 100,
  });
  const [current, setCurrent] = useState<Array<productObject>>([]);

  const getMoreData = () => {
    if (current.length === data.length) {
      setHasMore(false);
      return;
    }
    setCurrent(current.concat(data.slice(count.prev + 100, count.next + 100)));
    setCount((prevState) => ({
      prev: prevState.prev + 100,
      next: prevState.next + 100,
    }));
  };
  // Infinite scroll code end

  // Fetch data
  useEffect(() => {
    fetch(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json"
    )
      .then((response) => response.json())
      .then((result) => setData(result));
  }, []);

  useEffect(() => {
    //Update current size
    setCurrent(data.slice(0, 100));
  }, [data]);

  // Sort function
  function compare(a: productObject, b: productObject) {
    if (a.average_rating > b.average_rating) {
      return -1;
    }
    if (a.average_rating < b.average_rating) {
      return 1;
    }
    return 0;
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={current.length}
        next={getMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <button onClick={() => setData([...data.sort(compare)])}>
          Sort By rating
        </button>
        <div className="product_container">
          {current &&
            current
              ?.filter((product) =>
                product.title.toString().toLowerCase().includes(inputBox)
              )
              .map((product) => (
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
                  show={true}
                />
              ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Index;
