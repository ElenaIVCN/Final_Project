/*import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import { blue } from "@material-ui/core/colors";

const emails = ["username@gmail.com", "user02@gmail.com"];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[500],
    color: blue[100],
  },
});

export default function RecipeDetails({ handleClose }) {
  const classes = useStyles();

  const handleListItemClick = () => {
    handleClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='simple-dialog-title'
      open={true}
    >
      <DialogTitle id='simple-dialog-title'>Set backup account</DialogTitle>
      <List>
        {emails.map(email => (
          <ListItem
            button
            onClick={() => handleListItemClick(email)}
            key={email}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}

        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick("addAccount")}
        >
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary='Add account' />
        </ListItem>
      </List>
    </Dialog>
  );
} */

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function RecipeDetails({ handleClose }) {
  const classes = useStyles();
  const [meal, setMeal] = useState(null);
  const bull = <span className={classes.bullet}>•</span>;

  const {id} = useParams();


  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id)
    .then(res => res.json())
    .then(function(data) {
      console.log(data);
      setMeal(data.meals[0]);
    });
}, [id]);


// if(!meal) {
//     return <h1>Loading ...</h1>;
// }

  const handleListItemClick = () => {
    handleClose();
  };

  return (
    <Card className={classes.root}
    onClose={handleClose}
    open={true}>
      <CardContent>

        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Details
        </Typography>
            <div>
              <h1>
                { meal?.strInstructions }
              </h1>
            </div>

      </CardContent>
    </Card>
  );
}
