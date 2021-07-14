import { rest } from "msw";
import { BASE_URL } from "../constants";
import { collectBillYear, getBillFilterPredicate } from "../helpers";
import { Bill, BillCategory, BillSearchParams } from "../types";
import db, { TableName } from "./db";

export const handlers = [
  // Create bill.
  rest.post<Bill, Bill>(`${BASE_URL}/bill`, (req, res, ctx) => {
    db.getTable<Bill>(TableName.BILL)!.add(req.body);
    return res(ctx.json(req.body));
  }),

  // Read bill.
  rest.get<undefined, Bill[]>(`${BASE_URL}/bill`, (req, res, ctx) => {
    const searchParams = req.url.searchParams;
    const billRequestParams: BillSearchParams = {
      year: searchParams.get("year") ?? "",
      month: searchParams.get("month") ?? "",
    };
    const predicate = getBillFilterPredicate(billRequestParams);
    const bills = db.getTable<Bill>(TableName.BILL)!.query(predicate);
    return res(ctx.json(bills));
  }),

  // Read bill category
  rest.get<undefined, BillCategory[]>(
    `${BASE_URL}/billCategory`,
    (req, res, ctx) => {
      const categories = db
        .getTable<BillCategory>(TableName.CATEGORY)!
        .query(() => true);
      return res(ctx.json(categories));
    }
  ),

  // Read bill year
  rest.get<undefined, number[]>(`${BASE_URL}/billYear`, (req, res, ctx) => {
    const bills = db.getTable<Bill>(TableName.BILL)!.query(() => true);
    const billYears = collectBillYear(bills);
    return res(ctx.json(billYears));
  }),
];
