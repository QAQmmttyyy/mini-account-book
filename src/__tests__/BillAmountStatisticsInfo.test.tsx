import React from "react";
import { act, render, screen } from "@testing-library/react";
import { fakeExpenditureBill, fakeIncomeBill } from "../apiMocks/fakeData";
import { CNY_SYMBOL, EXPENDITURE_TEXT, INCOME_TEXT } from "../constants";
import { useApiStore } from "../store/api.store";
import BillAmountStatisticsInfo from "../containers/BillAmountStatisticsInfo";

test("renders bill amount statistics info", async () => {
  render(<BillAmountStatisticsInfo />);

  const fixedZeroText = (0).toFixed(2);
  const expenditureInfoA = `${EXPENDITURE_TEXT}: ${CNY_SYMBOL}${fixedZeroText}`;
  const incomeInfoA = `${INCOME_TEXT}: ${CNY_SYMBOL}${fixedZeroText}`;

  expect(screen.getByText(expenditureInfoA)).toBeInTheDocument();
  expect(screen.getByText(incomeInfoA)).toBeInTheDocument();

  act(() => {
    useApiStore.setState({ bills: [fakeIncomeBill, fakeExpenditureBill] });
  });

  const expenditureInfoB = `${EXPENDITURE_TEXT}: ${CNY_SYMBOL}${fakeExpenditureBill.amount.toFixed(
    2
  )}`;
  const incomeInfoB = `${INCOME_TEXT}: ${CNY_SYMBOL}${fakeIncomeBill.amount.toFixed(
    2
  )}`;

  expect(screen.getByText(expenditureInfoB)).toBeInTheDocument();
  expect(screen.getByText(incomeInfoB)).toBeInTheDocument();
});
