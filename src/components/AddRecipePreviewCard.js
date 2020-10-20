import React from 'react';
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

export default function RecipeDetails({ handleClose }) {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    const handleListItemClick = () => {
        handleClose();
    };

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={true}
        >
            <DialogTitle id="simple-dialog-title">Add Recipe</DialogTitle>
            <Formik
                initialValues={{
                    name: '',
                    ingredients: [''],
                    images: [],
                    description: '',
                }}
                onSubmit={async (values, helpers) => {
                    console.log(values);
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
                            <UploadImageButton
                                multiple
                                UploadButtons={UploadButtons}
                            />
                            <Typography variant="h6" className={classes.title}>
                                Ingredients
                            </Typography>
                            <FieldArray
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
                                    >
                                        {/* <ListItemAvatar> */}
                                        {/* <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar> */}
                                        {/* </ListItemAvatar>
            <ListItemText primary={email} /> */}
                                    </ListItem>
                                ))}

                                <ListItem
                                    autoFocus
                                    button
                                    onClick={() =>
                                        handleListItemClick('addIngredient')
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AddIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Add ingredients" />
                                </ListItem>
                            </List>
                            <Typography variant="h6" className={classes.title}>
                                Details:
                            </Typography>

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
