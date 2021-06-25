import create from "zustand";
import { readBill, readBillCategory, readBillYear } from "../api";
import { Bill, BillCategory } from "../types";

export interface ApiState {
  bills: Bill[];
  billCategories: BillCategory[];
  billYears: number[];
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
