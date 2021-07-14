import React from "react";
import { act, render, screen } from "@testing-library/react";
import { fakeExpenditureBill, fakeIncomeBill } from "../apiMocks/fakeData";
import {
  CNY_SYMBOL,
  EXPENDITURE_TEXT,
  INCOME_TEXT,
  MONTHLY_TOTAL_TEXT,
  NO_DATA_TEXT,
} from "../constants";
import { useApiStore } from "../store/api.store";
import MonthlyTotalAmountStatistics from "../containers/MonthlyTotalAmountStatistics";

test("renders bill amount statistics info", async () => {
  render(<MonthlyTotalAmountStatistics />);

  act(() => {
    useApiStore.setState({ bills: [fakeIncomeBill, fakeExpenditureBill] });
  });

  const expenditureInfo = `${EXPENDITURE_TEXT}${CNY_SYMBOL}${fakeExpenditureBill.amount.toFixed(
    2
  )}`;
  const incomeInfo = `${INCOME_TEXT}${CNY_SYMBOL}${fakeIncomeBill.amount.toFixed(
    2
  )}`;
  const liElements = screen.getAllByRole("listitem");
  expect(liElements[0]).toHaveTextContent(MONTHLY_TOTAL_TEXT);
  expect(liElements[1]).toHaveTextContent(expenditureInfo);
  expect(liElements[2]).toHaveTextContent(incomeInfo);
});

test("renders empty content", () => {
  useApiStore.setState({ bills: [] });

  render(<MonthlyTotalAmountStatistics />);

  const liElements = screen.getAllByRole("listitem");
  expect(liElements[0]).toHaveTextContent(MONTHLY_TOTAL_TEXT);
  expect(screen.getByText(NO_DATA_TEXT)).toBeInTheDocument();
});
