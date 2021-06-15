import { rest } from "msw";
import { BASE_URL } from "../constants";
import { getBillFilterPredicate } from "../helpers";
import { Bill, BillRequestParams } from "../types";
import { db } from "./db";

export const handlers = [
  // Create bill.
  rest.post<Bill, Bill>(`${BASE_URL}/bill`, (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),

  // Read bill.
  rest.get<undefined, Bill[]>(`${BASE_URL}/bill`, (req, res, ctx) => {
    const bills = db.get("bills") as Bill[];
    console.log(
      bills.map((bill) =>
        Object.assign(bill, {
          year: new Date(bill.time).getFullYear(),
          month: new Date(bill.time).getMonth() + 1,
        })
      )
    );
    const searchParams = req.url.searchParams;
    const hasGoodSearchParams =
      searchParams.get("year") &&
      searchParams.get("month") &&
      searchParams.get("category");

    // 400
    if (!hasGoodSearchParams) {
      return res(ctx.status(400, "Bad search params."), ctx.json([] as Bill[]));
    }

    // 200
    const billRequestParams: BillRequestParams = {
      year: searchParams.get("year")!,
      month: searchParams.get("month")!,
      category: searchParams.get("category")!,
    };
    const predicate = getBillFilterPredicate(billRequestParams);
    return res(ctx.json(bills.filter(predicate)));
  }),
];
