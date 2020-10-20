
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

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
    <Dialog
      onClose={handleClose}
      aria-labelledby='simple-dialog-title'
      open={true}
    >
      <DialogTitle id='simple-dialog-title'>{ meal?.strInstructions }</DialogTitle>

    </Dialog>
  );
}
