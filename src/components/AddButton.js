import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function FloatingActionButtons() {
  const history = useHistory();
  const classes = useStyles();

  const addRecipe = () => {
    history.push("/add_recipe");
  };

  return (
    <div className={classes.root}>
      <Fab color='primary' aria-label='add' onClick={addRecipe}>
        <AddIcon />
      </Fab>
    </div>
  );
}
