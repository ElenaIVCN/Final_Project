import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useParams } from 'react-router-dom';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { TextField } from 'formik-material-ui';
import { DialogContent, TextField as MUITextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { FieldArray, Form, Formik, Field } from 'formik';
import AuthTokenContext from '../features/AuthTokenContext';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Autocomplete from '@material-ui/lab/Autocomplete';

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

export default function AddRecipePreviewCard({ handleClose }) {
    const authToken = useContext(AuthTokenContext);
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const [meal, setMeal] = useState({});

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleListItemClick = () => {
        handleClose();
    };

    const { id } = useParams();

    const [open, setOpen] = useState(true);
    const [autocompleteOpen, setAutocompleteOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const loading = autocompleteOpen && categories.length === 0;

    useEffect(() => {
        if (id != null) {
            fetch(
                'http://younnite.com/api/recipe/' + id + '?include=ingredients'
            )
                .then((res) => res.json())
                .then(function (data) {
                    console.log(data);
                    setMeal(data.data);
                });
        }
    }, []);

    useEffect(() => {
        if (!autocompleteOpen) {
            setCategories([]);
        }
    }, [autocompleteOpen]);

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        fetch('http://younnite.com/api/categories')
            .then((res) => res.json())
            .then((response) => {
                if (active) {
                    setCategories(response.data);
                }
            });

        return () => {
            active = false;
        };
    }, [loading]);

    let ingredients = [];
    if (meal?.ingredients && meal?.ingredients.length) {
        meal.ingredients.map((ingredient) => {
            ingredients.push(ingredient.name);
        });
    }

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={true}
        >
            <DialogTitle id="simple-dialog-title">Add your Recipe</DialogTitle>
            <DialogContent>
                <Formik
                    enableReinitialize
                    initialValues={{
                        name: meal?.name,
                        ingredients: ingredients.length ? ingredients : [''],
                        images: [],
                        short_description: '',
                        description: meal?.description,
                        id: meal?.id,
                        categories: meal?.categories || [],
                    }}
                    onSubmit={async (values, helpers) => {
                        if (!values.id) {
                            delete values.id;
                        }

                        fetch('http://younnite.com/api/recipe', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${authToken}`,
                            },
                            body: JSON.stringify(values),
                        }).then((res) => {});
                    }}
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
                                            autoFocus
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
                                    {meal && meal.avatar && (
                                        <Grid item xs={12}>
                                            <Box>
                                                <img
                                                    src={meal?.avatar?.main}
                                                    style={{ width: 200 }}
                                                />
                                            </Box>
                                        </Grid>
                                    )}
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
                                        <h3>Categories</h3>

                                        <Autocomplete
                                            value={values.categories}
                                            multiple
                                            size="small"
                                            freeSolo
                                            id="combo-box-demo"
                                            onOpen={() => {
                                                setAutocompleteOpen(true);
                                            }}
                                            onClose={() => {
                                                setAutocompleteOpen(false);
                                            }}
                                            options={categories}
                                            loading={loading}
                                            getOptionLabel={(option) =>
                                                typeof option === 'object' &&
                                                option.name
                                                    ? option.name
                                                    : option
                                            }
                                            onChange={(event, newValue) => {
                                                setFieldValue(
                                                    'categories',
                                                    newValue
                                                );
                                            }}
                                            renderInput={(params) => (
                                                <MUITextField
                                                    {...params}
                                                    label="Select as many categories as you see fit"
                                                    variant="outlined"
                                                />
                                            )}
                                        />
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
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                        >
                                            Submit
                                        </Button>
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
