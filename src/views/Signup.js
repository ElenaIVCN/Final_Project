import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { TextField } from 'formik-material-ui';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { Field, Formik, Form } from 'formik';
import { useFirebaseApp, useUser } from 'reactfire';
import 'firebase/auth';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" component={RouterLink} to="/">
                Always hungry
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const firebase = useFirebaseApp();
    const user = useUser();

    return (
        <Container component="main" maxWidth="xs">
            {user && <Redirect to="/" />}
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Formik
                    initialValues={{
                        fullName: '',
                        email: '',
                        password: '',
                    }}
                    onSubmit={async (values /*helpers*/) => {
                        await firebase
                            .auth()
                            .createUserWithEmailAndPassword(
                                values.email,
                                values.password
                            )
                            .then((result) => {
                                result.user.updateProfile({
                                    displayName: values.fullName,
                                });
                            })
                            .catch((error) => {});
                    }}
                >
                    <Form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    component={TextField}
                                    required
                                    fullWidth
                                    variant="outlined"
                                    name="fullName"
                                    label="Full Name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    component={TextField}
                                    required
                                    fullWidth
                                    type="email"
                                    variant="outlined"
                                    name="email"
                                    label="Email Address"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    component={TextField}
                                    required
                                    fullWidth
                                    type="password"
                                    variant="outlined"
                                    name="password"
                                    label="Password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link
                                    component={RouterLink}
                                    to="/login"
                                    variant="body2"
                                >
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
