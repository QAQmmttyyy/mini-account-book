import { BillSearchParams, Bill } from "./types";

function predicateYear(received: number, expected: string) {
  return received === +expected;
}

function predicateMonth(received: number, expected: string) {
  return received + 1 === +expected;
}

export function getBillFilterPredicate(billRequestParams: BillSearchParams) {
  return function (bill: Bill) {
    const { year, month } = billRequestParams;
    const billDate = new Date(bill.time);
    return (
      predicateYear(billDate.getFullYear(), year) &&
      predicateMonth(billDate.getMonth(), month)
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

export function getExpenditureStatisticsByCategory(bills: Bill[]) {
  const amountStatisticMap = new Map<string, number>();

  bills.reduce((prev, bill) => {
    const { type, category = "", amount } = bill;
    switch (type) {
      case 0:
        return amountStatisticMap.set(
          category,
          (amountStatisticMap.get(category) ?? 0) + amount
        );
      case 1:
        return prev;
      default:
        return prev;
    }
  }, amountStatisticMap);

  return Array.from(amountStatisticMap.entries());
}

export function getInvalidRequiredFieldKey(
  fields: Record<string, any>,
  requiredKeys: string[]
) {
  for (const key of requiredKeys) {
    const value = fields[key];
    if (value === "" || value == undefined) {
      return key;
    }
  }
}
