import { request } from "./request";
import { BASE_URL } from "./constants";
import { Bill, BillCategory } from "./types";

export async function createBill(data: Bill): Promise<Bill> {
  const res = await request(`${BASE_URL}/bill`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function readBill(queryString: string): Promise<Bill[]> {
  const res = await request(`${BASE_URL}/bill?${queryString}`, {
    method: "GET",
  });

  return res.json();
}

export async function readBillCategory(): Promise<BillCategory[]> {
  const res = await request(`${BASE_URL}/billCategory`, {
    method: "GET",
  });

  return res.json();
}

export async function readBillYear(): Promise<number[]> {
  const res = await request(`${BASE_URL}/billYear`, {
    method: "GET",
  });

  return res.json();
}
