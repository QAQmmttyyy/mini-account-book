import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { server } from "../apiMocks/server";
import { BASE_URL } from "../constants";
import YearFilterSelect from "../containers/YearFilterSelect";

test("renders year data in descending order and with the default select option set", async () => {
  const years = [2020, 2021];
  const descendingYears = [2021, 2020];
  const expectedDefaultOptionText = `${descendingYears[0]}`; // "2021"
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

  expect(filterSelectElement).toHaveTextContent(expectedDefaultOptionText);
  for (let index = 0; index < optionElements.length; index++) {
    const optionElement = optionElements[index];
    const yearText = `${descendingYears[index]}`;
    expect(optionElement).toHaveTextContent(yearText);
    expect(optionElement).toHaveAttribute("data-value", yearText);
  }
});
