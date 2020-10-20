import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { TextField } from "formik-material-ui";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { useFirebaseApp, useUser } from "reactfire";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" component={RouterLink} to="/">
                Always Hungry
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
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
                    Sign in
                </Typography>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    onSubmit={async (values, /*helpers*/) => {
                        await firebase
                            .auth()
                            .signInWithEmailAndPassword(
                                values.email,
                                values.password
                            )
                            .then((result) => {
                                // console.log(result);
                                // result.user.updateProfile({
                                //     displayName: `Updated name`
                                // })
                            })
                            .catch((error) => {});
                    }}
                >
                    <Form className={classes.form} noValidate>
                        <Field
                            component={TextField}
                            margin="normal"
                            required
                            fullWidth
                            type="email"
                            variant="outlined"
                            name="email"
                            label="Email Address"
                            autoFocus
                        />
                        <Field
                            component={TextField}
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            variant="outlined"
                            name="password"
                            label="Password"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    component={RouterLink}
                                    to="/signup"
                                    variant="body2"
                                >
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
