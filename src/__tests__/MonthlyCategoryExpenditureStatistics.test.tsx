import React from "react";
import { render, screen } from "@testing-library/react";
import {
  fakeExpenditureBill,
  fakeExpenditureCategory,
  fakeIncomeBill,
  fakeIncomeCategory,
} from "../apiMocks/fakeData";
import { useApiStore } from "../store/api.store";
import { Bill } from "../types";
import {
  CNY_SYMBOL,
  MONTHLY_CATEGORY_EXPENDITURE_STATISTICS_TEXT,
  NO_CATEGORY_TEXT,
  NO_DATA_TEXT,
} from "../constants";
import MonthlyCategoryExpenditureStatistics from "../containers/MonthlyCategoryExpenditureStatistics";

test("renders statistics content", () => {
  const noCategoryExpenditureBill: Bill = {
    type: 0,
    time: Date.now(),
    amount: 2000,
  };
  useApiStore.setState({
    bills: [noCategoryExpenditureBill, fakeExpenditureBill, fakeIncomeBill],
    billCategories: [fakeExpenditureCategory, fakeIncomeCategory],
  });

  render(<MonthlyCategoryExpenditureStatistics />);

  const liElements = screen.getAllByRole("listitem");
  expect(liElements[0]).toHaveTextContent(
    MONTHLY_CATEGORY_EXPENDITURE_STATISTICS_TEXT
  );
  expect(liElements[1]).toHaveTextContent(
    `${NO_CATEGORY_TEXT}${CNY_SYMBOL}2000.00`
  );
  expect(liElements[2]).toHaveTextContent(
    `${
      fakeExpenditureCategory.name
    }${CNY_SYMBOL}${fakeExpenditureBill.amount.toFixed(2)}`
  );
});

test("renders empty content", () => {
  useApiStore.setState({ bills: [] });

  render(<MonthlyCategoryExpenditureStatistics />);

  const liElements = screen.getAllByRole("listitem");
  expect(liElements[0]).toHaveTextContent(
    MONTHLY_CATEGORY_EXPENDITURE_STATISTICS_TEXT
  );
  expect(screen.getByText(NO_DATA_TEXT)).toBeInTheDocument();
});
