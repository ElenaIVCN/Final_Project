import React from "react";
import { Grid } from "@material-ui/core";
import RecipePreviewCard from "../components/RecipePreviewCard";
import { Route, useHistory } from "react-router-dom";
import RecipeDetails from "./RecipeDetails";

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
      <Route
        path='/recipes/details'
        component={() => (
          <RecipeDetails
            handleClose={() => {
              history.push("/");
            }}
          />
        )}
      />
    </>
  );
}
