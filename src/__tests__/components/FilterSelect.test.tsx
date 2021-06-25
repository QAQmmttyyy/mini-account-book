import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterSelect from "../../components/FilterSelect";
import { OptionDataItem } from "../../types";

test("renders with placeholder display and the option item", () => {
  const placeholderText = "年";

  render(<FilterSelect value={""} placeholder={placeholderText} />);

  const filterSelectElement = screen.getByRole("button");
  expect(filterSelectElement).toHaveTextContent(placeholderText);

  userEvent.click(filterSelectElement);

  const placeholderOptionElement = screen.getByRole("option");
  expect(placeholderOptionElement).toHaveTextContent(placeholderText);
  expect(placeholderOptionElement).toHaveAttribute("aria-disabled", "true");
});

test("renders with options", () => {
  const optionsData: OptionDataItem[] = [
    { description: "2021", value: "2021" },
    { description: "2020", value: "2020" },
  ];

  render(<FilterSelect value="" optionsData={optionsData} />);

  const filterSelectElement = screen.getByRole("button");

  userEvent.click(filterSelectElement);

  const optionElements = screen.getAllByRole("option");
  for (let index = 0; index < optionElements.length; index++) {
    const optionElement = optionElements[index];
    const optionData = optionsData[index];
    expect(optionElement).toHaveTextContent(optionData.description as string);
    expect(optionElement).toHaveAttribute(
      "data-value",
      optionData.value as string
    );
  }
});

test("renders without placeholder display and the option item", () => {
  render(<FilterSelect value="" />);

  const filterSelectElement = screen.getByRole("button");
  // "\u200b": zero-width space
  expect(filterSelectElement).toHaveTextContent("\u200b");

  userEvent.click(filterSelectElement);

  expect(screen.queryByRole("option")).not.toBeInTheDocument();
});
