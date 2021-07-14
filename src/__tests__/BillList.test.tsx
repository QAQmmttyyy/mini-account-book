import React from "react";
import { rest } from "msw";
import { act, render, screen, waitFor } from "@testing-library/react";
import { server } from "../apiMocks/server";
import { fakeIncomeBill, fakeIncomeCategory } from "../apiMocks/fakeData";
import { BASE_URL, CNY_SYMBOL, INCOME_TEXT, NO_DATA_TEXT } from "../constants";
import { Bill } from "../types";
import { useApiStore } from "../store/api.store";
import {
  BillSearchParamsKey,
  useUrlSearchParamsStore,
} from "../store/urlSearchParams.store";
import { ExtraCategoryId } from "../enums";
import BillList from "../components/BillList";

describe("<BillList />", () => {
  const fakeBillDate = new Date(fakeIncomeBill.time);
  const listItemTextDict = {
    time: fakeBillDate.toLocaleDateString(), // "2021/6/7" for "zh-CN" locale
    category: fakeIncomeCategory.name, // "投资"
    description: `${INCOME_TEXT} ${CNY_SYMBOL}${fakeIncomeBill.amount.toFixed(
      2
    )}`, // "收入 ￥1000.00"
  };

  server.use(
    rest.get<undefined, Bill[]>(`${BASE_URL}/bill`, (req, res, ctx) => {
      return res(ctx.json([fakeIncomeBill]));
    })
  );
  useApiStore.setState({ billCategories: [fakeIncomeCategory] });

  test("renders bill list", async () => {
    // ""
    useUrlSearchParamsStore.setState({
      urlSearchParams: new URLSearchParams(),
    });

    render(<BillList />);

    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();

    act(() => {
      // "year=&month="
      useUrlSearchParamsStore.setState({
        urlSearchParams: new URLSearchParams({
          [BillSearchParamsKey.YEAR]: "",
          [BillSearchParamsKey.MONTH]: "",
        }),
      });
    });
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();

    act(() => {
      // "year=2021&month=6"
      useUrlSearchParamsStore.setState({
        urlSearchParams: new URLSearchParams({
          [BillSearchParamsKey.YEAR]: `${fakeBillDate.getFullYear()}`,
          [BillSearchParamsKey.MONTH]: `${fakeBillDate.getMonth() + 1}`,
        }),
      });
    });
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();

    act(() => {
      // "year=2021&month=6&category=All"
      useUrlSearchParamsStore
        .getState()
        .updateUrlSearchParams(
          BillSearchParamsKey.CATEGORY,
          ExtraCategoryId.ALL
        );
    });
    await waitFor(() => {
      expect(screen.getByRole("listitem")).toBeInTheDocument();
    });
    expect(screen.getByText(listItemTextDict.time)).toBeInTheDocument();
    expect(screen.getByText(listItemTextDict.category)).toBeInTheDocument();
    expect(screen.getByText(listItemTextDict.description)).toBeInTheDocument();
  });

  test("renders empty content", () => {
    useApiStore.setState({ bills: [] });

    render(<BillList />);

    expect(screen.getByText(NO_DATA_TEXT)).toBeInTheDocument();
  });
});
