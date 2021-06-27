import React, { useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useApiStore } from "../store/api.store";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import {
  BillSearchParamsKey,
  CNY_SYMBOL,
  EXPENDITURE_TEXT,
  ExtraCategoryName,
  INCOME_TEXT,
} from "../constants";
import { useUrlSearchParamsStore } from "../store/urlSearchParams.store";

interface Props {}

function BillList(props: Props) {
  const billCategories = useApiStore((state) => state.billCategories);

  const categoryIdToNameMap = billCategories.reduce(
    (prevMap, category) => prevMap.set(category.id, category.name),
    new Map<string, string>()
  );

  const bills = useApiStore((state) => state.bills);

  const billListItems = bills.map((bill, index) => {
    const { time, type, amount, category = "" } = bill;
    return (
      <ListItem key={index}>
        <ListItemText
          primary={new Date(time).toLocaleDateString()}
          secondary={
            categoryIdToNameMap.get(category) ?? ExtraCategoryName.NONE
          }
        />
        <Typography>
          {type ? INCOME_TEXT : EXPENDITURE_TEXT} {CNY_SYMBOL}
          {amount.toFixed(2)}
        </Typography>
      </ListItem>
    );
  });

  const setBills = useApiStore((state) => state.setBills);
  const urlSearchParams = useUrlSearchParamsStore(
    (state) => state.urlSearchParams
  );

  useEffect(() => {
    if (urlSearchParams.get(BillSearchParamsKey.YEAR)) {
      setBills(urlSearchParams.toString());
    }
  }, [urlSearchParams]);

  return <List>{billListItems}</List>;
}

export default BillList;
