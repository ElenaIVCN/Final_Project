import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';
import { TextField } from 'formik-material-ui';
import UploadImageButton from './UploadImageButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { FieldArray, Form, Formik, Field } from 'formik';
import AuthTokenContext from '../features/AuthTokenContext';
import { Link, useParams } from 'react-router-dom';
import RecipeDetails from '../views/RecipeDetails';
import { useHistory } from 'react-router-dom';
import { database } from 'firebase';

const UploadButtons = () => onclick();

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({});
function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        })
    );
}

export default function EditRecipe({ handleClose }) {
    const history = useHistory();
    const authToken = useContext(AuthTokenContext);
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const [meal, setMeal] = useState(null);

    const handleListItemClick = () => {
        handleClose();
    };

    const { id } = useParams();
    console.log('bearer: ' + authToken);

    useEffect(() => {
        fetch('http://younnite.com/api/recipe/' + id)
            .then((res) => res.json())
            .then(function (data) {
                console.log(data);
                setMeal(data.data);
            });
    }, []);

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={true}
        >
            <DialogTitle id="simple-dialog-title">
                Edit {meal?.name}
            </DialogTitle>
            <Formik
                enableReinitialize
                initialValues={{
                    name: meal?.name,
                    id: meal?.id,
                    //                    ingredients: [''],
                    //                    images: [],
                    //                    short_description: '',
                    description: meal?.description,
                }}
                onSubmit={async (values, helpers) => {
                    fetch('http://younnite.com/api/recipe/' + id, {
                        method: 'PUT',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${authToken}`,
                        },
                        body: JSON.stringify(values),
                    }).then((res) => {});
                }}
                render={({ values }) => {
                    return (
                        <Form>
                            <Field
                                component={TextField}
                                required
                                fullWidth
                                name="name"
                                label="Recipe Title"
                            />
                            <Field
                                component={TextField}
                                multiline
                                rows={4}
                                required
                                fullWidth
                                name="description"
                                label="Details"
                                variant="outlined"
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Submit
                            </Button>
                        </Form>
                    );
                }}
            ></Formik>
        </Dialog>
    );
}
