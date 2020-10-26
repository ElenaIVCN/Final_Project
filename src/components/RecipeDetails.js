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
            aria-labelledby="simple-dialog-title"
            open={true}
        >
            <DialogTitle id="simple-dialog-title">Show Recipe</DialogTitle>
            <DialogContent>
                {console.log(meal)}

                <Formik
                    enableReinitialize
                    initialValues={{
                        name: meal?.name,
                        ingredients: [''],
                        images: [],
                        short_description: '',
                        description: '',
                    }}
                    // onSubmit={async (values, helpers) => {
                    //     fetch('http://younnite.com/api/recipe', {
                    //         method: 'POST',
                    //         headers: {
                    //             Accept: 'application/json',
                    //             'Content-Type': 'application/json',
                    //             Authorization: `Bearer ${authToken}`,
                    //         },
                    //         body: JSON.stringify(values),
                    //     }).then((res) => {});
                    // }}
                    render={({ values, setFieldValue }) => {
                        const onSelectImage = (ev) => {
                            const reader = new FileReader();

                            reader.onload = function (e) {
                                setFieldValue('images', [
                                    ...values.images,
                                    e.target.result,
                                ]);
                            };

                            reader.readAsDataURL(ev.target.files[0]);
                            return ev.target.files[0];
                        };
                        return (
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            fullWidth
                                            required
                                            name="name"
                                            label="Recipe Title"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <MUITextField
                                            multiple
                                            type="file"
                                            name="images"
                                            onChange={onSelectImage}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FieldArray
                                            Ingredients
                                            name="ingredients"
                                            render={(arrayHelpers) => (
                                                <div>
                                                    {values.ingredients.map(
                                                        (ingredient, index) => (
                                                            <Field
                                                                fullWidth
                                                                key={index}
                                                                component={
                                                                    TextField
                                                                }
                                                                required
                                                                name={`ingredients[${index}]`}
                                                                label="Add ingredients"
                                                            />
                                                        )
                                                    )}

                                                    <Button
                                                        onClick={() =>
                                                            arrayHelpers.insert(
                                                                ''
                                                            )
                                                        }
                                                        variant="contained"
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                            )}
                                        ></FieldArray>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            multiline
                                            rows={2}
                                            fullWidth
                                            required
                                            name="short_description"
                                            label="Short Description"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            fullWidth
                                            multiline
                                            rows={4}
                                            required
                                            name="description"
                                            label="Details"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
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
                                    </Grid>
                                </Grid>
                            </Form>
                        );
                    }}
                ></Formik>
            </DialogContent>
        </Dialog>
    );
}
