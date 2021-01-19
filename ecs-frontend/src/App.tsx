import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Header from "./components/header";
import Main from "./components/main";
import Cart from "./components/checkout";
import Order from "./components/order";

function App() {
  const [inputBox, setInputBox] = useState<string>("");

  const handleInput = (value: string) => {
    setInputBox(value);
  };

  return (
    <div className="App">
      <Router>
        <Header handleInput={handleInput} inputBox={inputBox} />
        <Switch>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/order">
            <Order />
          </Route>
          <Route exact path="/">
            <Main inputBox={inputBox} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
