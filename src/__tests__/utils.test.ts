import { csvToArray } from "../utils";
import { Account } from "../types";

describe("utils", () => {
  test("csvToArray", () => {
    const csvContent = `type,time,category,amount
      0,1561910400000,8s0p77c323,5400`;
    const transformResult = csvToArray<Account>(csvContent);
    const expectResult: Account[] = [
      {
        type: 0,
        time: 1561910400000,
        category: "8s0p77c323",
        amount: 5400,
      },
    ];
    expect(transformResult).toEqual(expectResult);
  });
});
