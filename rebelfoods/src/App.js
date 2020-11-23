import React from "react";
import Home from "./component/home/homePage";
import Header from "./component/header/header";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useStateValue } from "./stateProvider";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [{ userTheme }] = useStateValue();

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: userTheme ? "dark" : "light",
        },
      }),
    [userTheme]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
