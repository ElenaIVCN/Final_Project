import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    MenuList,
    MenuItem,
    Popper,
    Grow,
    Paper,
    ClickAwayListener,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import {useFirebaseApp, useUser} from "reactfire";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link, useHistory } from "react-router-dom";
import SearchIcon from "./SearchIcon";


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar({ handleDrawerToggle }) {
  const classes = useStyles();
  const user = useUser();
  const anchorRef = useRef(null)
  const history = useHistory();
  const firebase = useFirebaseApp();
  const [ userMenuOpen, setUserMenuOpen ] = useState(false);

  const handleToggleUserMenu = () => {
      setUserMenuOpen((prevOpen) => !prevOpen);
  };

  const handleUserMenuClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
      }

      setUserMenuOpen(false);
  };

  const handleListKeyDown = (event) => {
      if (event.key === "Tab") {
          event.preventDefault();
          setUserMenuOpen(false);
      }
  };

  const handleSignOut = () => {
      firebase.auth().signOut().then(() => {
          history.push('/login');
      });
  }

  const prevUserMenuOpen = React.useRef(userMenuOpen);
  React.useEffect(() => {
      if (prevUserMenuOpen.current === true && userMenuOpen === false) {
          anchorRef.current.focus();
      }

      prevUserMenuOpen.current = userMenuOpen;
  }, [userMenuOpen]);


  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar>

        {/* <AddRecipe /> */}
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' noWrap className={classes.title}>
          Always hungry
        </Typography>
        <SearchIcon/>
        {user ? (<><Button
          color="inherit"
          ref={anchorRef}
          aria-controls={
              userMenuOpen ? "menu-list-grow" : undefined
          }
          aria-haspopup="true"
          onClick={handleToggleUserMenu}
      >
          {user.displayName}
      </Button>
      <Popper
          open={userMenuOpen}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
      >
          {({ TransitionProps, placement }) => (
              <Grow
                  {...TransitionProps}
                  style={{
                      transformOrigin:
                          placement === "bottom"
                              ? "center top"
                              : "center bottom",
                  }}
              >
                  <Paper>
                      <ClickAwayListener
                          onClickAway={handleUserMenuClose}
                      >
                          <MenuList
                              autoFocusItem={userMenuOpen}
                              id="menu-list-grow"
                              onKeyDown={handleListKeyDown}
                          >
                              <MenuItem
                                  component={Link}
                                  to="/profile"
                                  onClick={handleUserMenuClose}
                              >
                                  <ListItemIcon>
                                      <AccountCircleIcon fontSize="small" />
                                  </ListItemIcon>
                                  Profile
                              </MenuItem>
                              <MenuItem
                                  onClick={handleSignOut}
                              >
                                  <ListItemIcon>
                                      <ExitToAppIcon fontSize="small" />
                                  </ListItemIcon>
                                  Logout
                              </MenuItem>
                          </MenuList>
                      </ClickAwayListener>
                  </Paper>
              </Grow>
          )}
      </Popper></>) : <Button
          component={Link}
          color="inherit"
          to="/login"
          
      >
          Login
      </Button>}

      </Toolbar>

    </AppBar>
  );
}
