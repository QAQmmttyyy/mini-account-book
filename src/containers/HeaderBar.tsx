import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CreateBillDialogControl from "./CreateBillDialogControl";
import { APP_TITLE_TEXT } from "../constants";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#FFF",
    boxShadow: "0 1px 3px rgb(18 18 18 / 10%)",
  },
});

function HeaderBar() {
  const classes = useStyles();
  return (
    <AppBar className={classes.root} position="sticky" color="default">
      <Toolbar>
        <Grid item xs>
          <Typography variant="h6" color="primary">
            {APP_TITLE_TEXT}
          </Typography>
        </Grid>
        <CreateBillDialogControl />
      </Toolbar>
    </AppBar>
  );
}

export default HeaderBar;
