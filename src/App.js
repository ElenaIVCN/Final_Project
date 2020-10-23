import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
    ThemeProvider,
    createMuiTheme,
    makeStyles,
} from '@material-ui/core/styles';
import LoginPage from './views/LoginPage';
import Layout from './views/Layout';
import SignUp from './views/Signup';
import AuthTokenContext from './features/AuthTokenContext';
import { useFirebaseApp } from 'reactfire';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

const App = () => {
    const firebase = useFirebaseApp();
    const [authToken, setAuthToken] = useState(null);
    const classes = useStyles();
    const theme = createMuiTheme({
        palette: {
            type: 'dark',
        },
    });

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                user.getIdToken().then((accesToken) => {
                    setAuthToken(accesToken);
                });
            }
        });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <AuthTokenContext.Provider value={authToken}>
                <div className={classes.root}>
                    <CssBaseline />
                    <Router>
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/signup" component={SignUp} />
                        <Route path="/" component={Layout} />
                    </Router>
                </div>
            </AuthTokenContext.Provider>
        </ThemeProvider>
    );
};

export default App;
