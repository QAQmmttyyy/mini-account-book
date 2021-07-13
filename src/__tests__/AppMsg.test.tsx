import React from "react";
import {
  act,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useAppStore } from "../store/app.store";
import { GOT_IT_TEXT } from "../constants";
import AppMsg from "../containers/AppMsg";

test("open", () => {
  render(<AppMsg />);

  act(() => {
    useAppStore.getState().setMsg("hello world");
  });

  expect(screen.getByRole("alert")).toHaveTextContent("hello world");
  expect(screen.getByRole("button", { name: GOT_IT_TEXT })).toBeInTheDocument();
});

test("close", async () => {
  render(<AppMsg />);

  act(() => {
    useAppStore.getState().setMsg("hello world");
  });

  userEvent.click(screen.getByRole("button", { name: GOT_IT_TEXT }));

  await waitForElementToBeRemoved(screen.getByRole("alert"));
});
