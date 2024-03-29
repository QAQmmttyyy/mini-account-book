import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";
import Placeholder from "../components/Placeholder";
import {
  CNY_SYMBOL,
  MONTHLY_CATEGORY_EXPENDITURE_STATISTICS_TEXT,
  NO_DATA_TEXT,
} from "../constants";
import { getExpenditureStatisticsByCategory } from "../helpers";
import { useApiStore } from "../store/api.store";
import { useCategoryIdToNameMap } from "../hooks";

function MonthlyCategoryExpenditureStatistics() {
  const bills = useApiStore((state) => state.bills);
  const statistics = getExpenditureStatisticsByCategory(bills);
  const categoryIdToNameMap = useCategoryIdToNameMap();
  const sortedStatisticItems = statistics
    .sort((a, b) => b[1] - a[1])
    .map(([categoryId, amount]) => {
      return (
        <ListItem key={categoryId} dense>
          <ListItemText primary={categoryIdToNameMap.get(categoryId)} />
          <Typography>{`${CNY_SYMBOL}${amount.toFixed(2)}`}</Typography>
        </ListItem>
      );
    });

  return (
    <List>
      <ListSubheader>
        <Typography>{MONTHLY_CATEGORY_EXPENDITURE_STATISTICS_TEXT}</Typography>
      </ListSubheader>
      {sortedStatisticItems.length ? (
        sortedStatisticItems
      ) : (
        <Placeholder>{NO_DATA_TEXT}</Placeholder>
      )}
    </List>
  );
}

export default MonthlyCategoryExpenditureStatistics;
