import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { server } from "../apiMocks/server";
import { BASE_URL, YEAR_TEXT } from "../constants";
import { BillSearchParamsKey } from "../store/urlSearchParams.store";
import YearFilterSelect from "../components/YearFilterSelect";

test("renders with year data and selects year", async () => {
  const years = [2020, 2021];
  const descendingYears = [2021, 2020];
  server.use(
    rest.get<undefined, number[]>(`${BASE_URL}/billYear`, (req, res, ctx) => {
      return res(ctx.json(years));
    })
  );

  render(<YearFilterSelect />);

  const filterSelectElement = screen.getByRole("button");

  userEvent.click(filterSelectElement);

  const optionElements = await waitFor(() => {
    const optionElements = screen.getAllByRole("option");
    expect(optionElements.length).toBe(years.length);
    return optionElements;
  });
  expect(filterSelectElement).toHaveTextContent(`2021 ${YEAR_TEXT}`);
  expect(
    new URLSearchParams(location.search).get(BillSearchParamsKey.YEAR)
  ).toBe("2021");
  for (let index = 0; index < optionElements.length; index++) {
    const optionElement = optionElements[index];
    const yearText = `${descendingYears[index]}`;
    expect(optionElement).toHaveTextContent(yearText);
    expect(optionElement).toHaveAttribute("data-value", yearText);
  }

  userEvent.click(optionElements[1]);
  expect(filterSelectElement).toHaveTextContent(`2020 ${YEAR_TEXT}`);
  expect(
    new URLSearchParams(location.search).get(BillSearchParamsKey.YEAR)
  ).toBe("2020");
});
