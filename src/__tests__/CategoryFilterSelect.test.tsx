import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { server } from "../apiMocks/server";
import { rest } from "msw";
import { ALL_CATEGORY_TEXT, BASE_URL, NO_CATEGORY_TEXT } from "../constants";
import { BillCategory } from "../types";
import { ExtraCategoryId } from "../enums";
import { fakeExpenditureCategory } from "../apiMocks/fakeData";
import { BillSearchParamsKey } from "../store/urlSearchParams.store";
import CategoryFilterSelect from "../containers/CategoryFilterSelect";

test("renders bill category data and selects category", async () => {
  const categories = [fakeExpenditureCategory];
  const allCategories = [
    { id: ExtraCategoryId.ALL as string, name: ALL_CATEGORY_TEXT },
    { id: ExtraCategoryId.NO as string, name: NO_CATEGORY_TEXT },
  ].concat(categories);

  server.use(
    rest.get<undefined, BillCategory[]>(
      `${BASE_URL}/billCategory`,
      (req, res, ctx) => {
        return res(ctx.json(categories));
      }
    )
  );

  render(<CategoryFilterSelect />);

  const filterSelectElement = screen.getByRole("button");

  expect(filterSelectElement).toHaveTextContent(ALL_CATEGORY_TEXT);
  expect(
    new URLSearchParams(location.search).get(BillSearchParamsKey.CATEGORY)
  ).toBe(ExtraCategoryId.ALL);

  userEvent.click(filterSelectElement);

  const optionElements = await waitFor(() => {
    const optionElements = screen.getAllByRole("option");
    expect(optionElements.length).toBe(allCategories.length);
    return optionElements;
  });
  for (let index = 0; index < optionElements.length; index++) {
    const optionElement = optionElements[index];
    const { name, id } = allCategories[index];
    expect(optionElement).toHaveTextContent(name);
    expect(optionElement).toHaveAttribute("data-value", id);
  }

  userEvent.click(optionElements[0]);
  expect(filterSelectElement).toHaveTextContent(ALL_CATEGORY_TEXT);
  expect(
    new URLSearchParams(location.search).get(BillSearchParamsKey.CATEGORY)
  ).toBe(ExtraCategoryId.ALL);
  
  userEvent.click(filterSelectElement);
  userEvent.click(optionElements[1]);
  expect(filterSelectElement).toHaveTextContent(NO_CATEGORY_TEXT);
  expect(
    new URLSearchParams(location.search).get(BillSearchParamsKey.CATEGORY)
  ).toBe(ExtraCategoryId.NO);

  userEvent.click(filterSelectElement);
  userEvent.click(optionElements[2]);
  expect(filterSelectElement).toHaveTextContent(fakeExpenditureCategory.name);
  expect(
    new URLSearchParams(location.search).get(BillSearchParamsKey.CATEGORY)
  ).toBe(fakeExpenditureCategory.id);
});
