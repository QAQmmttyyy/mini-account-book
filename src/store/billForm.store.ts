import create from "zustand";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { EMPTY_STRING } from "../constants";
import { Bill } from "../types";

interface Fields {
  time: MaterialUiPickersDate;
  type: Bill["type"];
  amount: string;
  category: string;
}

type Errors = {
  [keys in keyof Fields]?: string;
};

interface BillFormState {
  fields: Fields;
  errors: Errors;
  setField: (name: keyof Fields, value: any) => void;
  setError: (name: keyof Errors, msg: string) => void;
  reset: () => void;
}

const initialFields: Fields = {
  time: new Date(),
  type: 0,
  amount: EMPTY_STRING,
  category: EMPTY_STRING,
};

const initialErrors: Errors = {};

export const useBillFormStore = create<BillFormState>((set) => {
  return {
    fields: initialFields,
    errors: initialErrors,
    setField: (name, value) => {
      set((prev) => {
        return {
          fields: {
            ...prev.fields,
            [name]: value,
          },
        };
      });
    },
    setError: (name, msg) => {
      set((prev) => {
        return {
          errors: {
            ...prev.errors,
            [name]: msg,
          },
        };
      });
    },
    reset: () => {
      set({ fields: initialFields, errors: initialErrors });
    },
  };
});
