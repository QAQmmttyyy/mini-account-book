import { BillRequestParams, Bill } from "./types";
import { ExtraCategoryValue } from "./constants";

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

export function collectBillYear(bills: Bill[]) {
  return Array.from(
    bills.reduce(
      (acc, bill) => acc.add(new Date(bill.time).getFullYear()),
      new Set<number>()
    )
  );
}

export function getCategoryExpenditureStatistics(bills: Bill[]) {
  const categoryToAmountMap = new Map<string | undefined, number>();

  for (let index = 0; index < bills.length; index++) {
    const { type, category, amount } = bills[index];
    if (type === 1) {
      continue;
    }
    categoryToAmountMap.set(
      category,
      (categoryToAmountMap.get(category) ?? 0) + amount
    );
  }

  return categoryToAmountMap.entries();
}
