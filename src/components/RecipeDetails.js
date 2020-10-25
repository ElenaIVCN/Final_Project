import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';

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
    const history = useHistory();
    const classes = useStyles();
    const [meal, setMeal] = useState(null);
    const bull = <span className={classes.bullet}>•</span>;

    const { id } = useParams();

    useEffect(() => {
        fetch('http://younnite.com/api/recipe/' + id)
            .then((res) => res.json())
            .then(function (data) {
                console.log(data);
                setMeal(data.data);
            });
    }, []);

    // if(!meal) {
    //     return <h1>Loading ...</h1>;
    // }

    const handleListItemClick = () => {
        handleClose();
    };

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={true}
        >
            <DialogTitle id="simple-dialog-title">{meal?.name}</DialogTitle>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {meal?.description}
                </Typography>
            </CardContent>
            <Link>
                <Button
                    component={Link}
                    color="inherit"
                    to={'/edit_recipe/' + id}
                >
                    Edit Recipe
                </Button>
            </Link>
            <Link>
                <Button
                    component={Link}
                    color="inherit"
                    to={'/delete_recipe/' + id}
                >
                    Delete Recipe
                </Button>
            </Link>
        </Dialog>
    );
}
