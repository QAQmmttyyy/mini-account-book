import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { MONTHS, MONTH_TEXT } from "../constants";
import { BillSearchParamsKey } from "../store/urlSearchParams.store";
import MonthFilterSelect from "../containers/MonthFilterSelect";

test("renders month data and selects month", async () => {
  render(<MonthFilterSelect />);

  const filterSelectElement = screen.getByRole("button");

  expect(filterSelectElement).toHaveTextContent(`${MONTHS[0]} ${MONTH_TEXT}`);
  expect(
    new URLSearchParams(location.search).get(BillSearchParamsKey.MONTH)
  ).toBe(MONTHS[0]);

  userEvent.click(filterSelectElement);

  const optionElements = await waitFor(() => {
    const optionElements = screen.getAllByRole("option");
    expect(optionElements.length).toBe(MONTHS.length);
    return optionElements;
  });
  for (let index = 0; index < optionElements.length; index++) {
    const optionElement = optionElements[index];
    const monthText = MONTHS[index];
    expect(optionElement).toHaveTextContent(monthText);
    expect(optionElement).toHaveAttribute("data-value", monthText);
  }

  userEvent.click(optionElements[1]);
  expect(filterSelectElement).toHaveTextContent(`${MONTHS[1]} ${MONTH_TEXT}`);
  expect(
    new URLSearchParams(location.search).get(BillSearchParamsKey.MONTH)
  ).toBe(MONTHS[1]);
});
