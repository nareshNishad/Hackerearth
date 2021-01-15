import "./App.css";
import Sidebar from "./component/Sidebar";
import Main from "./component/Main";
import Match from "./component/Match";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Sidebar />
            <Main />
          </Route>
          <Route exact path="/match">
            <Match />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
