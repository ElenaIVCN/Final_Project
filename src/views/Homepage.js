import React from "react";
import { Grid } from "@material-ui/core";
import RecipePreviewCard from "../components/RecipePreviewCard";
import { Route, useHistory } from "react-router-dom";
import RecipeDetails from "./RecipeDetails";
import AddButton from "../components/AddButton";
import AddRecipePreviewCard from "../components/AddRecipePreviewCard";

const FloatingActionButtons = () => onclick();

export default function Homepage() {
  const history = useHistory();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <RecipePreviewCard />
        </Grid>
        <Grid item>
          <RecipePreviewCard />
        </Grid>
        <Grid item>
          <RecipePreviewCard />
        </Grid>
        <Grid item>
          <RecipePreviewCard />
        </Grid>
        <Grid item>
          <RecipePreviewCard />
        </Grid>
        <Grid item>
          <RecipePreviewCard />
        </Grid>
      </Grid>
      <AddButton FloatingActionButtons={FloatingActionButtons} />

      <Route
        exact
        path='/recipes/details'
        component={() => (
          <RecipeDetails
            handleClose={() => {
              history.push("/");
            }}
          />
        )}
      />
            <Route
        exact
        path='/add_recipe'
        component={() => (
          <AddRecipePreviewCard
            handleClose={() => {
              history.push("/");
            }}
          />
        )}
      />
    </>
  );
}
