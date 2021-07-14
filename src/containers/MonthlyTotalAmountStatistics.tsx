import React, { Fragment } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { useApiStore } from "../store/api.store";
import {
  CNY_SYMBOL,
  EXPENDITURE_TEXT,
  INCOME_TEXT,
  MONTHLY_TOTAL_TEXT,
  NO_DATA_TEXT,
} from "../constants";
import Placeholder from "../components/Placeholder";

function MonthlyTotalAmountStatistics() {
  const bills = useApiStore((state) => state.bills);

  let totalExpenditureAmount = 0;
  let totalIncomeAmount = 0;
  for (const { type, amount } of bills) {
    type === 0
      ? (totalExpenditureAmount += amount)
      : (totalIncomeAmount += amount);
  }

  const expenditureInfo = `${CNY_SYMBOL}${totalExpenditureAmount.toFixed(2)}`;
  const incomeInfo = `${CNY_SYMBOL}${totalIncomeAmount.toFixed(2)}`;

  return (
    <List>
      <ListSubheader>
        <Typography>{MONTHLY_TOTAL_TEXT}</Typography>
      </ListSubheader>
      {bills.length ? (
        <Fragment>
          <ListItem dense>
            <ListItemText>{EXPENDITURE_TEXT}</ListItemText>
            <Typography>{expenditureInfo}</Typography>
          </ListItem>
          <ListItem dense>
            <ListItemText>{INCOME_TEXT}</ListItemText>
            <Typography>{incomeInfo}</Typography>
          </ListItem>
        </Fragment>
      ) : (
        <Placeholder>{NO_DATA_TEXT}</Placeholder>
      )}
    </List>
  );
}

export default MonthlyTotalAmountStatistics;
