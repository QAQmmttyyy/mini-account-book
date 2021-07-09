import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { MONTHS } from "../constants";
import MonthFilterSelect from "../containers/MonthFilterSelect";

test("renders month data and with the default select option set", async () => {
  const expectedDefaultOptionText = MONTHS[0]; // "1"

  render(<MonthFilterSelect />);

  const filterSelectElement = screen.getByRole("button");

  userEvent.click(filterSelectElement);

  const optionElements = await waitFor(() => {
    const optionElements = screen.getAllByRole("option");
    expect(optionElements.length).toBe(MONTHS.length);
    return optionElements;
  });

  expect(filterSelectElement).toHaveTextContent(expectedDefaultOptionText);
  for (let index = 0; index < optionElements.length; index++) {
    const optionElement = optionElements[index];
    const monthText = MONTHS[index];
    expect(optionElement).toHaveTextContent(monthText);
    expect(optionElement).toHaveAttribute("data-value", monthText);
  }
});
