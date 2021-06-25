import { csvToArray } from "../utils";
import { Bill } from "../types";

describe("csvToArray", () => {
  test("result should not be empty array when it has header and data line.", () => {
    const csvContent = `type,time,category,amount
      0,1561910400000,8s0p77c323,5400`;
    const expectResult: Bill[] = [
      {
        type: 0,
        time: 1561910400000,
        category: "8s0p77c323",
        amount: 5400,
      },
    ];

    const transformResult = csvToArray<Bill>(csvContent);

    expect(transformResult).toEqual(expectResult);
  });

  test("result should be empty array when it only has header line.", () => {
    const csvContent = `type,time,category,amount`;
    
    const transformResult = csvToArray<Bill>(csvContent);

    expect(transformResult).toEqual([]);
  });
});
