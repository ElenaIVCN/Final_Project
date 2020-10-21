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
                setData(data);
            });
    }, [currentUrl]);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item>
                    {/* { games.map(item => <RecipePreviewCard game={ item } key={ item._id }/>)} */}
                </Grid>
                <Grid item>
                    {data && data.meals && data.meals.length ? (
                        <div>
                            <RecipePreviewCard meal={data.meals[0]} />
                            {/* <RecipePreviewCard game={ games[1] }/>
            <RecipePreviewCard game={ games[2] }/> */}
                        </div>
                    ) : (
                        ''
                    )}
                </Grid>
                <Grid item>
                    {data && data.meals && data.meals.length ? (
                        <div>
                            <RecipePreviewCard meal={data.meals[1]} />
                        </div>
                    ) : (
                        ''
                    )}
                </Grid>
                <Grid item>
                    {data && data.meals && data.meals.length ? (
                        <div>
                            <RecipePreviewCard meal={data.meals[2]} />
                        </div>
                    ) : (
                        ''
                    )}
                </Grid>
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
