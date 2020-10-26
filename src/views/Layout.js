import React, { useEffect, useState } from 'react';
import { Route, useHistory, withRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Homepage from './Homepage';
import { TheContextProvider } from '../features/TheContext';
import {
    Fastfood as DinnerIcon,
    EmojiFoodBeverage as BreakfastIcon,
    Kitchen as LunchIcon,
} from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';

const categories = [
    {
        url: '/category/breakfast',
        name: 'Breakfast',
        icon: <BreakfastIcon />,
    },
    {
        url: '/category/smoothies',
        name: 'Smoothies',
        icon: <DinnerIcon />,
    },
    {
        url: '/category/appetizers',
        name: 'Appetizers',
        icon: <LunchIcon />,
    },
    {
        url: '/category/brunch',
        name: 'Brunch',
        icon: <LunchIcon />,
    },
    {
        url: '/category/lunch',
        name: 'Lunch',
        icon: <LunchIcon />,
    },

    {
        url: '/category/salads',
        name: 'Salads',
        icon: <LunchIcon />,
    },
    {
        url: '/category/soups',
        name: 'Soups',
        icon: <LunchIcon />,
    },
    {
        url: '/category/dinner',
        name: 'Dinner',
        icon: <LunchIcon />,
    },
    {
        url: '/category/desserts',
        name: 'Desserts',
        icon: <LunchIcon />,
    },
];

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

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

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
