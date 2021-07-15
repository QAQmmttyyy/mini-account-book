import React, { useState } from "react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import {
  fakeExpenditureCategory,
  fakeIncomeCategory,
} from "../apiMocks/fakeData";
import CreateBillDialog from "../components/CreateBillDialog";
import { useApiStore } from "../store/api.store";
import {
  AMOUNT_TEXT,
  BASE_URL,
  CATEGORY_TEXT,
  CHOOSE_TIME_TEXT,
  CONFIRM_TEXT,
  CREATE_BILL_TEXT,
  INCOME_TEXT,
  NOT_EMPTY_TEXT,
} from "../constants";
import { server } from "../apiMocks/server";
import { Bill } from "../types";

server.use(
  rest.post<Bill, Bill>(`${BASE_URL}/bill`, (req, res, ctx) => {
    return res(ctx.json(req.body));
  })
);

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
  userEvent.type(screen.getByLabelText(new RegExp(AMOUNT_TEXT)), "99999.99");
  userEvent.click(screen.getByText(CONFIRM_TEXT));

  await waitForElementToBeRemoved(
    screen.getByRole("dialog", { name: CREATE_BILL_TEXT })
  );
});

test("improper process", async () => {
  render(<DialogControl />);

  userEvent.click(screen.getByText(CONFIRM_TEXT));

  expect(screen.getByText(NOT_EMPTY_TEXT)).toBeInTheDocument();
  expect(
    screen.getByRole("dialog", { name: CREATE_BILL_TEXT })
  ).toBeInTheDocument();
});
