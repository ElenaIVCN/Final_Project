import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

export default function FloatingActionButtons() {
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();

    const addRecipe = () => {
        history.push('/add_recipe');
    };

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    return (
        <Zoom
            in={true}
            timeout={transitionDuration}
            style={{
                transitionDelay: `${transitionDuration.exit}ms`,
            }}
            unmountOnExit
        >
            <Fab
                aria-label="add-recipe"
                className={classes.fab}
                color="primary"
                onClick={addRecipe}
            >
                <AddIcon />
            </Fab>
        </Zoom>
    );
}
