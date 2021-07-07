import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import HeaderBar from "./containers/HeaderBar";
import Grid from "@material-ui/core/Grid";
import YearFilterSelect from "./containers/YearFilterSelect";
import MonthFilterSelect from "./containers/MonthFilterSelect";
import CategoryFilterSelect from "./containers/CategoryFilterSelect";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import BillList from "./containers/BillList";
import BillAmountStatisticsInfo from "./containers/BillAmountStatisticsInfo";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    backgroundColor: "#F5F5F5",
  },
  main: {
    width: 1000,
    padding: "10px 16px",
    margin: "0 auto",
  },
  leftColumn: {
    width: 694,
    marginRight: 10,
  },
  filtersContainer: {
    padding: 16,
    paddingLeft: 8,
  },
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <HeaderBar />
      {/* body container */}
      <Grid container className={classes.main} alignItems="flex-start">
        {/* left */}
        <Grid item className={classes.leftColumn}>
          {/* filter header */}
          <Card variant="outlined">
            <Grid
              container
              className={classes.filtersContainer}
              alignItems="center"
            >
              <Grid item xs>
                <YearFilterSelect />
                <MonthFilterSelect />
                <CategoryFilterSelect />
              </Grid>
              <BillAmountStatisticsInfo />
            </Grid>
            <Divider />
            <BillList />
          </Card>
          {/* bill list */}
        </Grid>
        {/* right */}
      </Grid>
    </div>
  );
}

export default App;
