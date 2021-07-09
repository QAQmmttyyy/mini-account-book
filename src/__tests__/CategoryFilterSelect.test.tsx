import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { ExtraCategoryName } from "../constants";
import { db } from "../apiMocks/db";
import { BillCategory } from "../types";
import CategoryFilterSelect from "../containers/CategoryFilterSelect";

test("renders bill category data and with the default select option set", async () => {
  const categories = db.get("categories") as BillCategory[];
  const EXTRA_OPTION_AMOUNT = 2;

  render(<CategoryFilterSelect />);

  const filterSelectElement = screen.getByRole("button");

  userEvent.click(filterSelectElement);

  const optionElements = await waitFor(() => {
    const optionElements = screen.getAllByRole("option");
    expect(optionElements.length).toBe(categories.length + EXTRA_OPTION_AMOUNT);
    return optionElements;
  });

  expect(filterSelectElement).toHaveTextContent(ExtraCategoryName.ALL);
  // Omit the two local options: "All" and "None".
  for (
    let index = EXTRA_OPTION_AMOUNT;
    index < optionElements.length;
    index++
  ) {
    const optionElement = optionElements[index];
    const { name, id } = categories[index - EXTRA_OPTION_AMOUNT];
    expect(optionElement).toHaveTextContent(name);
    expect(optionElement).toHaveAttribute("data-value", id);
  }
});
