import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    }
}));

export default function FullPageLoading() {
    const classes = useStyles();

    return (
        <Backdrop className={classes.root} open="trye">
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}