import React from "react";
import { rest } from "msw";
import { act, render, screen, waitFor } from "@testing-library/react";
import { server } from "../apiMocks/server";
import {
  BASE_URL,
  BillSearchParamsKey,
  CNY_SYMBOL,
  INCOME_TEXT,
} from "../constants";
import { Bill, BillCategory } from "../types";
import { useApiStore } from "../store/api.store";
import { useUrlSearchParamsStore } from "../store/urlSearchParams.store";
import BillList from "../containers/BillList";

describe("<BillList />", () => {
  const fakeDate = new Date(2021, 5, 7, 9, 30);
  const fakeBill: Bill = {
    type: 1,
    time: fakeDate.getTime(),
    category: "1",
    amount: 1000,
  };
  const fakeCategory: BillCategory = {
    id: "1",
    type: 1,
    name: "投资",
  };
  const listItemTextDict = {
    time: fakeDate.toLocaleDateString(), // "2021/6/7" for "zh-CN" locale
    category: fakeCategory.name, // "投资"
    description: `${INCOME_TEXT} ${CNY_SYMBOL}${fakeBill.amount.toFixed(2)}`, // "收入 ￥1000.00"
  };

  server.use(
    rest.get<undefined, Bill[]>(`${BASE_URL}/bill`, (req, res, ctx) => {
      return res(ctx.json([fakeBill]));
    })
  );
  useApiStore.setState({ billCategories: [fakeCategory] });

  test("renders bill list", async () => {
    // ""
    useUrlSearchParamsStore.setState({
      urlSearchParams: new URLSearchParams(),
    });

    render(<BillList />);

    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();

    act(() => {
      // "year="
      useUrlSearchParamsStore.setState({
        urlSearchParams: new URLSearchParams(`${BillSearchParamsKey.YEAR}=`),
      });
    });

    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();

    act(() => {
      // "year=2021"
      useUrlSearchParamsStore.setState({
        urlSearchParams: new URLSearchParams(
          `${BillSearchParamsKey.YEAR}=${fakeDate.getFullYear()}`
        ),
      });
    });

    await waitFor(() => {
      expect(screen.getByRole("listitem")).toBeInTheDocument();
    });

    expect(screen.getByText(listItemTextDict.time)).toBeInTheDocument();
    expect(screen.getByText(listItemTextDict.category)).toBeInTheDocument();
    expect(screen.getByText(listItemTextDict.description)).toBeInTheDocument();
  });
});
