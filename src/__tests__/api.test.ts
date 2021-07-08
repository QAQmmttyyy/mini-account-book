import { db } from "../apiMocks/db";
import { createBill, readBill, readBillCategory, readBillYear } from "../api";
import { collectBillYear, getBillFilterPredicate } from "../helpers";
import { Bill, BillSearchParams } from "../types";

test("createBill", async () => {
  const postData: Bill = {
    type: 0,
    time: 1561910400000,
    category: "8s0p77c323",
    amount: 5400,
  };

  const resData = await createBill(postData);

  expect(resData).toEqual(postData);
});

test("readBill", async () => {
  const params: BillSearchParams = {
    year: "2019",
    month: "7",
    category: "8s0p77c323",
  };
  const searchParams = new URLSearchParams(params);

  const resData = await readBill(searchParams.toString());

  const predicate = getBillFilterPredicate(params);
  expect(resData.filter(predicate)).toEqual(resData);
  expect(resData.filter((bill) => !predicate(bill))).toEqual([]);
  // expect(resData).not.toEqual([]);
});

test("readBillCategory", async () => {
  const billCategories = db.get("categories");

  const resData = await readBillCategory();

  expect(resData).toEqual(billCategories);
});

test("readBillYear", async () => {
  const bills = db.get("bills") as Bill[];
  const billYears = collectBillYear(bills);

  const resData = await readBillYear();

  expect(resData).toEqual(billYears);
});
