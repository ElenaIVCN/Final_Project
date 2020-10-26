import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { TextField } from 'formik-material-ui';
import { DialogContent, TextField as MUITextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { FieldArray, Form, Formik, Field } from 'formik';
import AuthTokenContext from '../features/AuthTokenContext';
import Grid from '@material-ui/core/Grid';
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

export default function AddRecipePreviewCard({ handleClose }) {
    const authToken = useContext(AuthTokenContext);
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);

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
            <DialogTitle id="simple-dialog-title">Add your Recipe</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{
                        name: '',
                        ingredients: [''],
                        images: [],
                        short_description: '',
                        description: '',
                    }}
                    onSubmit={async (values, helpers) => {
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
                                            fullwidth
                                            required
                                            name="short_description"
                                            label="Short Description"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
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
