import React, { useEffect, useState, useContext } from 'react';
import { Grid } from '@material-ui/core';
import RecipePreviewCard from '../components/RecipePreviewCard';
import { Route, useHistory } from 'react-router-dom';
import RecipeDetails from './RecipeDetails';
import AddButton from '../components/AddButton';
import AddRecipePreviewCard from '../components/AddRecipePreviewCard';
import { TheContext } from '../features/TheContext';

const FloatingActionButtons = () => onclick();

export default function Homepage() {
    const [data, setData] = useState([]);
    const history = useHistory();
    const { currentUrl } = useContext(TheContext);

    useEffect(() => {
        fetch(currentUrl)
            .then((res) => res.json())
            .then(function (data) {
                console.log(data);
                setData(data.data);
            });
    }, [currentUrl]);

    return (
        <>
            <Grid container spacing={2}>
                {data.map((meal) => (
                    <Grid item key={meal.id}>
                        <RecipePreviewCard meal={meal} />
                    </Grid>
                ))}
            </Grid>
            <AddButton FloatingActionButtons={FloatingActionButtons} />

            <Route
                exact
                path="/recipes/details/:id"
                component={() => (
                    <RecipeDetails
                        handleClose={() => {
                            history.push('/');
                        }}
                    />
                )}
            />
            <Route
                exact
                path="/add_recipe"
                component={() => (
                    <AddRecipePreviewCard
                        handleClose={() => {
                            history.push('/');
                        }}
                    />
                )}
            />
        </>
    );
}
