import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import styles from "./home.module.css";
import Card from "../Card";

function Index() {
  const [data, setData] = useState([]);
  const [inputBox, setInputBox] = useState("");
  let history = useHistory();

  useEffect(() => {
    axios
      .get(
        `https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json`
      )
      .then((result) => setData(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (e, info) => {
    history.push({
      pathname: `/${info.id}`,
      state: {
        user: { ...info },
      },
    });
  };

  return (
    <div>
      <div className={styles.inputfield} style={{ marginTop: "30px" }}>
        <input
          type="text"
          id="name"
          required
          onChange={(e) => setInputBox(e.target.value.toLowerCase())}
        />
        <label htmlFor="name">Search by name:</label>
      </div>
      <div className={styles.container}>
        {data
          .filter((candidate) =>
            candidate.name.toLowerCase().includes(inputBox)
          )
          .map((candidate) => (
            <div key={candidate.id} onClick={(e) => handleClick(e, candidate)}>
              <Card info={candidate} />
            </div>
          ))}
      </div>
      <div className={styles.button_continer}>
        <button onClick={() => history.push("/selected")}>
          Selected candidate
        </button>
        <button
          style={{ backgroundColor: "brown" }}
          onClick={() => history.push("/rejected")}
        >
          Rejected candidate
        </button>
      </div>
    </div>
  );
}

export default Index;
