import React from "react";
import "./header.modules.css";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useStateValue } from "../../stateProvider";

function Header() {
  const [{ userTheme }, dispatch] = useStateValue();

  const handleChange = (e) => {
    dispatch({
      type: "SET_THEME",
      item: e.target.checked,
    });
  };

  return (
    <div className="header_main">
      <img
        className="logo_image"
        src="https://rebelfoods.co/assets/rebelLogo.png"
        alt=""
      />

      <div>
        <FormControlLabel
          control={
            <Switch checked={userTheme} onChange={handleChange} name="dark" />
          }
          label="Dark Mode"
        />
      </div>
    </div>
  );
}

export default Header;
