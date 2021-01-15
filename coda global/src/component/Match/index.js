import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FaGrinStars } from "react-icons/fa";
import { FcMoneyTransfer } from "react-icons/fc";

import "./Match.css";
import { useStateValue } from "../../StateProvide";

function Index() {
  const [{ betNo }, dispatch] = useStateValue();
  const [winningNo, setWinningNo] = useState(null);
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")));
  const history = useHistory();
  useEffect(() => {
    let temp = Math.floor(Math.random() * 10) + 1;
    setWinningNo(temp);
    dispatch({
      type: "BET_NUM",
      item: temp,
    });
  }, []);

  return (
    <div className="match_bigger_container">
      <div style={{ fontSize: "20px", textAlign: "center" }}>
        Winning Bet: {winningNo}
      </div>
      <div className="match_main_container">
        <div className="match_container">
          {users?.map((user, index) => (
            <div
              className={"match_user"}
              style={
                user.Bet == winningNo
                  ? { borderColor: "green", transform: "scale(1.2)" }
                  : { borderColor: "#aa0000" }
              }
              key={index}
            >
              <div className="match_img">
                <img className="" src={user["Profile Image"]} alt="profile" />
                <div className="">{user.Name}</div>
              </div>
              <div className="match_amount">
                <span>
                  {user.Bet} <FaGrinStars color="green" />
                </span>
                <span>
                  {user.Price} <FcMoneyTransfer />
                </span>
              </div>
              <div
                className="result"
                style={{
                  backgroundColor: user.Bet == winningNo ? "green" : "#aa0000",
                }}
              >
                {parseInt(user.Bet) === winningNo ? "Winner" : "lose"}
              </div>
            </div>
          ))}
          {/* <div style={{ position: "absolute" }}>
          <button>Rematch</button>
          <button>Match</button>
        </div> */}
        </div>
      </div>
      <button style={{ width: "10%" }} onClick={() => history.push("/")}>
        Back
      </button>
    </div>
  );
}

export default Index;
