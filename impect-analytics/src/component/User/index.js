import React from "react";
import { useLocation, useHistory } from "react-router-dom";

import styles from "./user.module.css";
import Card from "../Card";
import { useStateValue } from "../../StateProvider";
import GoHome from "../GoHome";

function Index() {
  const [{}, dispatch] = useStateValue();
  const location = useLocation();
  const history = useHistory();

  let info = location.state.user;

  const handleSelect = () => {
    dispatch({
      type: "SELECT_USER",
      item: info,
    });
    history.push("/");
  };

  const handleReject = () => {
    dispatch({
      type: "REJECT_USER",
      item: info,
    });
    history.push("/");
  };

  return (
    <div className={styles.container}>
      <Card info={info} />
      <div>
        <button onClick={handleSelect}>Sortlist</button>
        <button onClick={handleReject} style={{ backgroundColor: "brown" }}>
          Reject
        </button>
      </div>
      <GoHome />
    </div>
  );
}

export default Index;
