import create from "zustand";
import { createBill, readBill, readBillCategory, readBillYear } from "../api";
import { Bill, BillCategory } from "../types";

export interface ApiState {
  bill?: Bill;
  bills: Bill[];
  billCategories: BillCategory[];
  billYears: number[];
  createBill: (...args: Parameters<typeof createBill>) => Promise<void>;
  setBills: (...args: Parameters<typeof readBill>) => Promise<void>;
  setBillCategories: (
    ...args: Parameters<typeof readBillCategory>
  ) => Promise<void>;
  setBillYears: (...args: Parameters<typeof readBillYear>) => Promise<void>;
}

export const useApiStore = create<ApiState>((set) => {
  return {
    bills: [],
    billCategories: [],
    billYears: [],
    createBill: async (...args) => {
      set({ bill: await createBill(...args) });
    },
    setBills: async (...args) => {
      set({ bills: await readBill(...args) });
    },
    setBillCategories: async (...args) => {
      set({ billCategories: await readBillCategory(...args) });
    },
    setBillYears: async (...args) => {
      set({ billYears: await readBillYear(...args) });
    },
  };
});
