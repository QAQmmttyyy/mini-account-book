import React, { useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { useApiStore } from "../store/api.store";
import {
  CNY_SYMBOL,
  EXPENDITURE_TEXT,
  INCOME_TEXT,
  NO_CATEGORY_TEXT,
  NO_DATA_TEXT,
} from "../constants";
import { ExtraCategoryValue } from "../enums";
import {
  BillSearchParamsKey,
  useUrlSearchParamsStore,
} from "../store/urlSearchParams.store";
import Placeholder from "../components/Placeholder";

function BillList() {
  const urlSearchParams = useUrlSearchParamsStore(
    (state) => state.urlSearchParams
  );
  const paramYear = urlSearchParams.get(BillSearchParamsKey.YEAR);
  const paramMonth = urlSearchParams.get(BillSearchParamsKey.MONTH);
  const bill = useApiStore((state) => state.bill);
  const setBills = useApiStore((state) => state.setBills);
  useEffect(() => {
    if (paramYear && paramMonth) {
      setBills(
        new URLSearchParams({ year: paramYear, month: paramMonth }).toString()
      );
    }
  }, [paramYear, paramMonth, bill]);

  const billCategories = useApiStore((state) => state.billCategories);
  const categoryIdToNameMap = billCategories.reduce(
    (prevMap, category) => prevMap.set(category.id, category.name),
    new Map<string, string>()
  );
  const bills = useApiStore((state) => state.bills);
  const paramCategory = urlSearchParams.get(BillSearchParamsKey.CATEGORY);
  const filteredBills =
    paramCategory === ExtraCategoryValue.ALL
      ? bills
      : bills.filter(
          ({ category = ExtraCategoryValue.NONE }) => category === paramCategory
        );
  const billListItems = filteredBills.map((bill, index) => {
    const { time, type, amount, category = "" } = bill;
    return (
      <ListItem key={index}>
        <ListItemText
          primary={new Date(time).toLocaleDateString()}
          secondary={categoryIdToNameMap.get(category) ?? NO_CATEGORY_TEXT}
        />
        <Typography>
          {type ? INCOME_TEXT : EXPENDITURE_TEXT} {CNY_SYMBOL}
          {amount.toFixed(2)}
        </Typography>
      </ListItem>
    );
  });

  return billListItems.length ? (
    <List>{billListItems}</List>
  ) : (
    <Placeholder>{NO_DATA_TEXT}</Placeholder>
  );
}

export default BillList;
