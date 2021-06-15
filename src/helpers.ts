import { BillRequestParams, Bill, ExtraCategoryValue } from "./types";

function predicateYear(received: number, expected: string) {
  return received === +expected;
}

function predicateMonth(received: number, expected: string) {
  return received + 1 === +expected;
}

function predicateCategory(received: Bill["category"], expected: string) {
  if (expected === ExtraCategoryValue.ALL) {
    return true;
  }
  if (expected === ExtraCategoryValue.NONE) {
    return received === undefined;
  }
  return received === expected;
}

export function getBillFilterPredicate(billRequestParams: BillRequestParams) {
  return function (bill: Bill) {
    const { year, month, category } = billRequestParams;
    const billDate = new Date(bill.time);
    return (
      predicateYear(billDate.getFullYear(), year) &&
      predicateMonth(billDate.getMonth(), month) &&
      predicateCategory(bill.category, category)
    );
  };
}
