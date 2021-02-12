import React, { useEffect, useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { BsArrowUpDown } from "react-icons/bs";
import "./Main.css";

import { useStateValue } from "../../StateProvide";

function Index() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [inputBox, setInputBox] = useState("");
  const [bet, setBet] = useState(null);
  const [price, setPrice] = useState(null);
  const [{ betNo }, dispatch] = useStateValue();

  useEffect(() => {
    fetch(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/bets7747a43.json"
    )
      .then((response) => response.json())
      .then((result) => setData(result));
  }, []);

  const handleCheckbox = (e, index) => {
    let temp = selected;
    if (e.target.checked) {
      temp.push(index); //select
    } else {
      temp = selected.filter((i) => i !== index); //de-select
    }

    setSelected(temp);
    dispatch({
      type: "ADD_USER",
      item: temp,
    });
  };

  function dynamicSort(property, dir) {
    // console.log({ property, dir });
    if (dir === null) {
      return;
    }
    let sortOrder;
    if (dir) {
      sortOrder = 1;
    } else {
      sortOrder = -1;
    }
    // if (property[0] === "-") {
    //   sortOrder = -1;
    //   property = property.substr(1);
    // }
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }

  return (
    <div className="main_container">
      <h4>Select playing 9</h4>
      <div className="inputfield">
        <input
          type="text"
          id="name"
          required
          onChange={(e) => setInputBox(e.target.value.toLowerCase())}
        />
        <label htmlFor="name">Search by name:</label>
      </div>
      <section>
        <div className="tbl-header">
          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>Name</th>
                <th>Avatar</th>
                <th onClick={() => setBet(!bet)} style={{ cursor: "pointer" }}>
                  Bet
                  <BsArrowUpDown />
                </th>
                <th
                  onClick={() => setPrice(!price)}
                  style={{ cursor: "pointer" }}
                >
                  Price
                </th>
                <th>Fate</th>
                <th>Winnings</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table cellPadding="0" cellSpacing="0" border="0">
            <tbody>
              {data
                .filter((user) => user.Name.toLowerCase().includes(inputBox))
                .sort(dynamicSort("Bet", bet))
                // .sort(dynamicSort("Price", price))
                .map((user, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        style={{ height: "20px" }}
                        type="checkbox"
                        onClick={(e) => handleCheckbox(e, user)}
                      />
                    </td>
                    <td>{user.Name}</td>
                    <td>
                      <img
                        className="profile_image"
                        src={user["Profile Image"]}
                        alt="profile_image"
                      />
                    </td>
                    <td>{user.Bet}</td>
                    <td>{user.Price}</td>
                    <td>
                      {betNo ? (user.Bet == betNo ? "Win" : "Loss") : "-"}
                    </td>
                    <td>
                      {betNo ? (user.Bet == betNo ? user.Price * 2 : 0) : "-"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Index;
