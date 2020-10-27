import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from 'formik-material-ui';
import { useHistory } from 'react-router-dom';
import { DialogContent, TextField as MUITextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { FieldArray, Form, Formik, Field } from 'formik';
import AuthTokenContext from '../features/AuthTokenContext';
import Box from '@material-ui/core/Box';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';

const UploadButtons = () => onclick();

const ingredients = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({});

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        })
    );
}

export default function RecipeDetails({ handleClose }) {
    const authToken = useContext(AuthTokenContext);
    const history = useHistory();
    const classes = useStyles();
    const [meal, setMeal] = useState({});
    const bull = <span className={classes.bullet}>•</span>;
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);

    const { id } = useParams();

    useEffect(() => {
        fetch('http://younnite.com/api/recipe/' + id)
            .then((res) => res.json())
            .then(function (data) {
                console.log(data);
                setMeal(data.data);
            });
    }, []);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleListItemClick = () => {
        handleClose();
    };

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            open={true}
        >
            <DialogTitle id="alert-dialog-title">{meal?.name}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <DialogContentText id="alert-dialog-description">
                            {meal?.short_description}
                        </DialogContentText>
                    </Grid>

                    <Grid item xs={12}>
                        {meal?.description}
                    </Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12}>
                        <Link>
                            <Button
                                component={Link}
                                color="primary"
                                to={'/edit_recipe/' + id}
                            >
                                Edit Recipe
                            </Button>
                        </Link>
                        <Link>
                            <Button
                                component={Link}
                                color="primary"
                                to={'/delete_recipe/' + id}
                            >
                                Delete Recipe
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}
