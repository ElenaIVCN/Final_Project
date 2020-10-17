import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme, makeStyles} from "@material-ui/core/styles";
import LoginPage from "./views/LoginPage";
import Layout from "./views/Layout";
import SignUp from "./views/Signup";

const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
    },
}));

const App = () => {
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Router>
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/signup' component={SignUp} />
          <Route path='/' component={Layout} />
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
