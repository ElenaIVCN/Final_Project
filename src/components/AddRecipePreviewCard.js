import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import { TextField } from 'formik-material-ui';
import { TextField as MUITextField } from '@material-ui/core';
import UploadImageButton from './UploadImageButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { FieldArray, Form, Formik, Field } from 'formik';
import AuthTokenContext from '../features/AuthTokenContext';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import Icon from '@material-ui/core/Icon';

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
                            <Field
                                component={TextField}
                                required
                                fullWidth
                                name="name"
                                label="Recipe Title"
                            />
                            <MUITextField
                                multiple
                                type="file"
                                name="images"
                                onChange={onSelectImage}
                            />
                            <br></br>
                            <div> Ingredients </div>
                            <FieldArray
                                Ingredients
                                name="ingredients"
                                render={(arrayHelpers) => (
                                    <div>
                                        {values.ingredients.map(
                                            (ingredient, index) => (
                                                <Field
                                                    key={index}
                                                    component={TextField}
                                                    required
                                                    fullWidth
                                                    name={`ingredients[${index}]`}
                                                    label="Add ingredients"
                                                />
                                            )
                                        )}
                                        <Button
                                            onClick={() =>
                                                arrayHelpers.insert('')
                                            }
                                            variant="contained"
                                        >
                                            Add Ingredients
                                        </Button>
                                    </div>
                                )}
                            ></FieldArray>

                            <List>
                                {emails.map((email) => (
                                    <ListItem
                                        button
                                        onClick={() =>
                                            handleListItemClick(email)
                                        }
                                        key={email}
                                    ></ListItem>
                                ))}

                                <ListItem
                                    autoFocus
                                    button
                                    onClick={() =>
                                        handleListItemClick('addIngredient')
                                    }
                                ></ListItem>
                            </List>
                            <Field
                                component={TextField}
                                multiline
                                rows={3}
                                required
                                fullWidth
                                name="short_description"
                                label="Short Description"
                                variant="outlined"
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
