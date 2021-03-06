import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import AuthTokenContext from '../features/AuthTokenContext';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function DeleteRecipe({ handleClose }) {
    const history = useHistory();
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const authToken = useContext(AuthTokenContext);

    const handleYes = (event) => {
        fetch('http://younnite.com/api/recipe/' + id, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        }).then((res) => {});
        handleClose();
    };

    const handleNo = () => {
        handleClose();
    };
    const { id } = useParams();

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={true}
        >
            <h1>Are you sure?</h1>
            <ButtonGroup disableElevation variant="contained" color="primary">
                <Button onClick={() => handleYes()}>Yes</Button>
                <Button onClick={() => handleNo()}>No</Button>
            </ButtonGroup>
        </Dialog>
    );
}
