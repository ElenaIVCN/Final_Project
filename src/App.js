import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import {
  Fastfood as DinnerIcon,
  EmojiFoodBeverage as BreakfastIcon,
} from "@material-ui/icons";
import Homepage from "./views/Homepage";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const categories = [
  {
    url: "/category/breakfast",
    name: "Breakfast",
    icon: <BreakfastIcon />,
  },
  {
    url: "/category/dinner",
    name: "Dinner",
    icon: <DinnerIcon />,
  },
];

const App = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <Sidebar
        links={categories}
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Router>
          <Route path='/' component={Homepage} />
        </Router>
      </main>
    </div>
  );
};

export default App;
