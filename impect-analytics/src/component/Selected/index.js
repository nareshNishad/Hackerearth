import React from "react";
import { useStateValue } from "../../StateProvider";

import Card from "../Card";
import GoHome from "../GoHome";
import styles from "./selected.module.css";

function Index() {
  const [{ selected }, dispatch] = useStateValue();
  
  return (
    <>
      <div className={styles.container}>
        {selected.map((candidate) => (
          <div key={candidate.id}>
            <Card info={candidate} />
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <GoHome />
      </div>
    </>
  );
}

export default Index;
