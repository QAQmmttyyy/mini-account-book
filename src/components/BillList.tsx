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
  NO_DATA_TEXT,
} from "../constants";
import { ExtraCategoryId } from "../enums";
import {
  BillSearchParamsKey,
  useUrlSearchParamsStore,
} from "../store/urlSearchParams.store";
import Placeholder from "../components/Placeholder";
import { useCategoryIdToNameMap } from "../hooks";

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

  const categoryIdToNameMap = useCategoryIdToNameMap();
  const bills = useApiStore((state) => state.bills);
  const paramCategory = urlSearchParams.get(BillSearchParamsKey.CATEGORY);
  const filteredBills =
    paramCategory === ExtraCategoryId.ALL
      ? bills
      : bills.filter(
          ({ category = ExtraCategoryId.NO }) => category === paramCategory
        );
  const billListItems = filteredBills.map((bill, index) => {
    const { time, type, amount, category = "" } = bill;
    return (
      <ListItem key={index}>
        <ListItemText
          primary={new Date(time).toLocaleDateString()}
          secondary={categoryIdToNameMap.get(category)}
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
