import React from "react";
import { render, screen } from "@testing-library/react";
import { APP_TITLE_TEXT, CREATE_BILL_TEXT } from "../constants";
import HeaderBar from "../components/HeaderBar";

test("renders", () => {
  render(<HeaderBar />);

  expect(
    screen.getByRole("heading", { name: APP_TITLE_TEXT })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: CREATE_BILL_TEXT })
  ).toBeInTheDocument();
});
