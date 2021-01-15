import React from "react";
import "./Sidebar.css";
import { FaGrinStars } from "react-icons/fa";
import { FcMoneyTransfer } from "react-icons/fc";
import { useStateValue } from "../../StateProvide";
import { useHistory } from "react-router-dom";

function Index() {
  const [{ users }, dispatch] = useStateValue();
  const history = useHistory();

  const goToMatch = () => {
    localStorage.setItem("users", JSON.stringify(users)); // to not lose state on hard refreash
    history.push("/match");
  };

  return (
    <div className="sidebar_container">
      <div className="logo">
        <img
          className="logo_img"
          src="https://cdn3.iconfinder.com/data/icons/vol-2/128/casino-512.png"
          alt="logo"
        />
      </div>
      {users.map((user) => (
        <div className="user_side_container">
          <img
            className="user_side_img"
            src={user["Profile Image"]}
            alt="profile"
          />
          <div className="user_side_info">
            {user.Name}
            <div className="user_side_bet">
              <span>
                {user.Bet} <FaGrinStars color="green" />
              </span>
              <span>
                {user.Price} <FcMoneyTransfer />
              </span>
            </div>
          </div>
        </div>
      ))}
      <div style={{ textAlign: "center", padding: "15px" }}>
        {users.length === 9 && (
          <button onClick={() => goToMatch()}>start</button>
        )}
      </div>
    </div>
  );
}

export default Index;
