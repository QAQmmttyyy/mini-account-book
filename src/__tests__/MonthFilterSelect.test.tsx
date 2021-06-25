import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { MONTHS } from "../constants";
import MonthFilterSelect from "../containers/MonthFilterSelect";

test("renders month data and with the default select option set", async () => {
  const EXTRA_OPTION_AMOUNT = 1;
  const expectedDefaultOptionText = MONTHS[0]; // "1"

  render(<MonthFilterSelect />);

  const filterSelectElement = screen.getByRole("button");

  userEvent.click(filterSelectElement);

  const optionElements = await waitFor(() => {
    const optionElements = screen.getAllByRole("option");

    expect(optionElements.length).toBe(MONTHS.length + EXTRA_OPTION_AMOUNT);

    return optionElements;
  });

  expect(filterSelectElement).toHaveTextContent(expectedDefaultOptionText);

  // Omit the placeholder option.
  for (
    let index = EXTRA_OPTION_AMOUNT;
    index < optionElements.length;
    index++
  ) {
    const optionElement = optionElements[index];
    const monthText = MONTHS[index - EXTRA_OPTION_AMOUNT];
    expect(optionElement).toHaveTextContent(monthText);
    expect(optionElement).toHaveAttribute("data-value", monthText);
  }
});
