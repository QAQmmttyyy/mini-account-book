import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import React from "react";
import CNYAmountInput, { CNYAmountInputProps } from "../CNYAmountInput";
import { AMOUNT_TEXT, NOT_EMPTY_TEXT } from "../../constants";
import { useBillFormStore } from "../../store/billForm.store";

function AmountField() {
  const value = useBillFormStore((state) => state.fields.amount);
  const setField = useBillFormStore((state) => state.setField);

  const error = useBillFormStore((state) => state.errors.amount);
  const setError = useBillFormStore((state) => state.setError);

  const handleChange: CNYAmountInputProps["onChange"] = (event) => {
    const targetValue = event.target.value;
    setField("amount", targetValue);

    if (targetValue) {
      setError("amount", "");
    }
  };
  const handleBlur: TextFieldProps["onBlur"] = (event) => {
    setError("amount", event.target.value ? "" : NOT_EMPTY_TEXT);
  };

  return (
    <TextField
      id="amount-input"
      label={AMOUNT_TEXT}
      placeholder="--"
      name="amount"
      value={value}
      helperText={error}
      error={Boolean(error)}
      onChange={handleChange}
      onBlur={handleBlur}
      InputProps={{
        inputComponent: CNYAmountInput as any,
      }}
      InputLabelProps={{
        shrink: true,
      }}
      required
    />
  );
}

export default AmountField;
