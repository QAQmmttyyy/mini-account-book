import { Bill } from "./types";
import { BASE_URL } from "./constants";

export async function createBill(data: Bill): Promise<Bill> {
  const res = await fetch(`${BASE_URL}/bill`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function readBill(queryString: string): Promise<Bill[]> {
  const res = await fetch(`${BASE_URL}/bill?${queryString}`, {
    method: "GET",
  });

  return res.json();
}

// export function readBillCategory() {}

// export function readBillYear() {}
