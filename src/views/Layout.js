import React, { useEffect, useState } from 'react';
import { Route, useHistory, withRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Homepage from './Homepage';
import { TheContextProvider } from '../features/TheContext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        position: 'relative',
    },
}));

const Layout = withRouter(({ match }) => {
    const history = useHistory();
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [categories, setCategories] = React.useState([]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        fetch('http://younnite.com/api/categories')
            .then((res) => res.json())
            .then(function (data) {
                setCategories(data.data);
            });
    }, []);

    return history.location.pathname === '/login' ||
        history.location.pathname === '/signup' ? (
        ''
    ) : (
        <>
            <TheContextProvider>
                <Navbar handleDrawerToggle={handleDrawerToggle} />
                <Sidebar
                    links={categories}
                    handleDrawerToggle={handleDrawerToggle}
                    mobileOpen={mobileOpen}
                />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Route path="/" component={Homepage} />
                </main>
            </TheContextProvider>
        </>
    );
});

export default Layout;
