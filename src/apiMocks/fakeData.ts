import { Bill, BillCategory } from "../types";

const fakeDate = new Date(2021, 5, 7, 9, 30);

// Income
export const fakeIncomeBill: Bill = {
  type: 1,
  time: fakeDate.getTime(),
  category: "1",
  amount: 1000,
};
export const fakeIncomeCategory: BillCategory = {
  id: "1",
  type: 1,
  name: "投资",
};

// Expenditure
export const fakeExpenditureBill: Bill = {
  type: 0,
  time: fakeDate.getTime(),
  category: "2",
  amount: 1000,
};
export const fakeExpenditureCategory: BillCategory = {
  id: "2",
  type: 0,
  name: "旅遊",
};
