import { Bill, BillCategory } from "../types";
import { csvToArray } from "../utils";
import { plainText as billCsvString } from "./data/bill.csv";
import { plainText as categoriesCsvString } from "./data/categories.csv";

const db = new Map<"bills" | "categories", Bill[] | BillCategory[]>();

function initDB() {
  db.set("bills", csvToArray<Bill>(billCsvString));
  db.set("categories", csvToArray<BillCategory>(categoriesCsvString));
}

export { db, initDB };
