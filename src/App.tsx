import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import AppMsg from "./containers/AppMsg";
import HeaderBar from "./containers/HeaderBar";
import BillList from "./containers/BillList";
import YearFilterSelect from "./containers/YearFilterSelect";
import MonthFilterSelect from "./containers/MonthFilterSelect";
import CategoryFilterSelect from "./containers/CategoryFilterSelect";
import MonthlyTotalAmountStatistics from "./containers/MonthlyTotalAmountStatistics";
import MonthlyCategoryExpenditureStatistics from "./containers/MonthlyCategoryExpenditureStatistics";

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
      <AppMsg />
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
              <YearFilterSelect />
              <MonthFilterSelect />
              <CategoryFilterSelect />
            </Grid>
            <Divider />
            <BillList />
          </Card>
        </Grid>
        {/* right */}
        <Grid item xs>
          <Card variant="outlined">
            <MonthlyTotalAmountStatistics />
            <MonthlyCategoryExpenditureStatistics />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
