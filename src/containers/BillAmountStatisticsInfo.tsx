import React from "react";
import Typography from "@material-ui/core/Typography";
import { useApiStore } from "../store/api.store";
import { CNY_SYMBOL, EXPENDITURE_TEXT, INCOME_TEXT } from "../constants";

interface Props {}

function BillAmountStatisticsInfo(props: Props) {
  const bills = useApiStore((state) => state.bills);

  let totalExpenditureAmount = 0;
  let totalIncomeAmount = 0;
  for (const { type, amount } of bills) {
    // For keeping the amount counted here to be consistent with
    // the sum of the amount displayed in the list ui.
    const fixedAmount = Number(amount.toFixed(2));

    type === 0
      ? (totalExpenditureAmount += fixedAmount)
      : (totalIncomeAmount += fixedAmount);
  }

  const expenditureInfo = `${EXPENDITURE_TEXT}: ${CNY_SYMBOL}${totalExpenditureAmount.toFixed(
    2
  )}`;
  const incomeInfo = `${INCOME_TEXT}: ${CNY_SYMBOL}${totalIncomeAmount.toFixed(
    2
  )}`;

  return (
    <div>
      <Typography>{expenditureInfo}</Typography>
      <Typography>{incomeInfo}</Typography>
    </div>
  );
}

export default BillAmountStatisticsInfo;
