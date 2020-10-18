import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import { blue } from "@material-ui/core/colors";
import TextField from '@material-ui/core/TextField';
import UploadImageButton from './UploadImageButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const UploadButtons = () => onclick();

const emails = ["username@gmail.com", "user02@gmail.com"];
const useStyles = makeStyles({

});
function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}


export default function RecipeDetails({ handleClose }) {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const handleListItemClick = () => {
    handleClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='simple-dialog-title'
      open={true}
    >
      <DialogTitle id='simple-dialog-title'>Add Recipe</DialogTitle>
      <TextField required id="standard-required" label="Required" defaultValue="Recipe Title" />
      <UploadImageButton UploadButtons={UploadButtons} />
      <Typography variant="h6" className={classes.title}>
            Ingredients
          </Typography>
          <div className={classes.demo}>
            <List dense={dense}>
              {generate(
                <ListItem>
                  {/* <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? 'Secondary text' : null}
                  /> */}
                  <TextField required id="standard-required" defaultValue="Add ingredients" />
                </ListItem>,
              )}
            </List>
          </div>

      <List>
        {emails.map(email => (
          <ListItem
            button
            onClick={() => handleListItemClick(email)}
            key={email}
          >
            {/* <ListItemAvatar> */}
              {/* <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar> */}
            {/* </ListItemAvatar>
            <ListItemText primary={email} /> */}
          </ListItem>
        ))}

        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick("addIngredient")}
        >
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary='Add ingredients' />
        </ListItem>
      </List>
      <Typography variant="h6" className={classes.title}>
            Details:
          </Typography>
          <TextField
          id="outlined-multiline-static"

          multiline
          rows={4}
          defaultValue=""
          variant="outlined"
        />
              <Button variant="contained" color="primary">
        Submit
      </Button>
    </Dialog>
    
  );
}
