import { rest } from "msw";
import { BASE_URL } from "../constants";
import { collectBillYear, getBillFilterPredicate } from "../helpers";
import { Bill, BillCategory, BillRequestParams } from "../types";
import { db } from "./db";

export const handlers = [
  // Create bill.
  rest.post<Bill, Bill>(`${BASE_URL}/bill`, (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),

  // Read bill.
  rest.get<undefined, Bill[]>(`${BASE_URL}/bill`, (req, res, ctx) => {
    const bills = db.get("bills") as Bill[];
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

  // Read bill category
  rest.get<undefined, BillCategory[]>(
    `${BASE_URL}/billCategory`,
    (req, res, ctx) => {
      const billCategories = db.get("categories") as BillCategory[];
      return res(ctx.json(billCategories));
    }
  ),

  // Read bill year
  rest.get<undefined, number[]>(`${BASE_URL}/billYear`, (req, res, ctx) => {
    const bills = db.get("bills") as Bill[];
    const billYears = collectBillYear(bills);
    return res(ctx.json(billYears));
  }),
];
