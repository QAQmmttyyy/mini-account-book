import { createBill, readBill } from "../api";
import { getBillFilterPredicate } from "../helpers";
import { Bill, BillRequestParams } from "../types";

describe("api", () => {
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
    const params: BillRequestParams = {
      year: "2019",
      month: "7",
      category: "8s0p77c323",
    };
    const searchParams = new URLSearchParams(params);
    const resData = await readBill(searchParams.toString());
    const predicate = getBillFilterPredicate(params);
    expect(resData).not.toEqual([]);
    expect(resData.filter(predicate)).toEqual(resData);
    expect(resData.filter((bill) => !predicate(bill))).toEqual([]);
  });
});
