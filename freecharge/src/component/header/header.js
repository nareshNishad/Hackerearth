import React, { useState, useEffect } from "react";
import "./header.css";
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
        src="https://cdn.freelogovectors.net/wp-content/uploads/2019/02/freecharge_logo.png"
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
