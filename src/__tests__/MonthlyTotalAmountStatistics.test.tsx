import React from "react";
import { act, render, screen } from "@testing-library/react";
import { fakeExpenditureBill, fakeIncomeBill } from "../apiMocks/fakeData";
import {
  CNY_SYMBOL,
  EXPENDITURE_TEXT,
  INCOME_TEXT,
  MONTHLY_TOTAL_TEXT,
} from "../constants";
import { useApiStore } from "../store/api.store";
import MonthlyTotalAmountStatistics from "../containers/MonthlyTotalAmountStatistics";

test("renders bill amount statistics info", async () => {
  render(<MonthlyTotalAmountStatistics />);

  const fixedZeroText = (0).toFixed(2);
  const expenditureInfoA = `${EXPENDITURE_TEXT}${CNY_SYMBOL}${fixedZeroText}`;
  const incomeInfoA = `${INCOME_TEXT}${CNY_SYMBOL}${fixedZeroText}`;
  const liElementsA = screen.getAllByRole("listitem");
  expect(liElementsA[0]).toHaveTextContent(MONTHLY_TOTAL_TEXT);
  expect(liElementsA[1]).toHaveTextContent(expenditureInfoA);
  expect(liElementsA[2]).toHaveTextContent(incomeInfoA);

  act(() => {
    useApiStore.setState({ bills: [fakeIncomeBill, fakeExpenditureBill] });
  });

  const expenditureInfoB = `${EXPENDITURE_TEXT}${CNY_SYMBOL}${fakeExpenditureBill.amount.toFixed(
    2
  )}`;
  const incomeInfoB = `${INCOME_TEXT}${CNY_SYMBOL}${fakeIncomeBill.amount.toFixed(
    2
  )}`;
  const liElementsB = screen.getAllByRole("listitem");
  expect(liElementsB[0]).toHaveTextContent(MONTHLY_TOTAL_TEXT);
  expect(liElementsB[1]).toHaveTextContent(expenditureInfoB);
  expect(liElementsB[2]).toHaveTextContent(incomeInfoB);
});
