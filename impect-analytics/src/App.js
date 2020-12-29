import { Route, Switch } from "react-router-dom";

import "./App.css";
import Home from "./component/Home";
import User from "./component/User";
import Selected from "./component/Selected";
import Rejected from "./component/Rejected";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/selected" component={Selected} />
      <Route exact path="/rejected" component={Rejected} />
      <Route exact path="/:id" component={User} />
    </Switch>
  );
}

export default App;
