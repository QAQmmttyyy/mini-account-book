import { rest } from "msw";
import { BASE_URL } from "../constants";
import { Account } from "../types";

export const handlers = [
  // Create account.
  rest.post<Account, Account>(`${BASE_URL}/account`, (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),
];
