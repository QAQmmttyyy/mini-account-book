import React, { useState } from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import {
  fakeExpenditureCategory,
  fakeIncomeCategory,
} from "../apiMocks/fakeData";
import CreateBillDialog from "../containers/CreateBillDialog";
import { useApiStore } from "../store/api.store";
import {
  AMOUNT_TEXT,
  CATEGORY_TEXT,
  CHOOSE_TIME_TEXT,
  CONFIRM_TEXT,
  CREATE_BILL_TEXT,
  INCOME_TEXT,
} from "../constants";

useApiStore.setState({
  billCategories: [fakeIncomeCategory, fakeExpenditureCategory],
});

const DialogControl = () => {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  return <CreateBillDialog onClose={handleClose} open={open} />;
};

test("normal process", async () => {
  render(<DialogControl />);

  userEvent.click(screen.getByLabelText(CHOOSE_TIME_TEXT));
  userEvent.click(screen.getByText("8"));
  userEvent.click(screen.getByLabelText(new RegExp(CATEGORY_TEXT)));
  userEvent.click(screen.getAllByRole("option")[1]);
  userEvent.click(screen.getByLabelText(new RegExp(INCOME_TEXT)));
  userEvent.type(screen.getByLabelText(AMOUNT_TEXT), "99999.99");
  userEvent.click(screen.getByText(CONFIRM_TEXT));

  expect(
    screen.queryByRole("dialog", { name: CREATE_BILL_TEXT })
  ).not.toBeInTheDocument();
});

test("improper process", async () => {
  render(<DialogControl />);

  userEvent.click(screen.getByText(CONFIRM_TEXT));

  expect(
    screen.queryByRole("dialog", { name: CREATE_BILL_TEXT })
  ).toBeInTheDocument();
});
