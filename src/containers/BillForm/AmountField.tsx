import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import React from "react";
import CNYAmountInput, {
  CNYAmountInputProps,
} from "../../components/CNYAmountInput";
import { AMOUNT_TEXT, EMPTY_STRING, NOT_EMPTY_TEXT } from "../../constants";
import { useBillFormStore } from "../../store/billForm.store";

interface Props {}

function AmountField(props: Props) {
  const value = useBillFormStore((state) => state.fields.amount);
  const setField = useBillFormStore((state) => state.setField);

  const error = useBillFormStore((state) => state.errors.amount);
  const setError = useBillFormStore((state) => state.setError);

  const handleChange: CNYAmountInputProps["onChange"] = (event) => {
    const targetValue = event.target.value;
    setField("amount", targetValue);

    if (targetValue) {
      setError("amount", EMPTY_STRING);
    }
  };
  const handleBlur: TextFieldProps["onBlur"] = (event) => {
    setError("amount", event.target.value ? EMPTY_STRING : NOT_EMPTY_TEXT);
  };

  return (
    <TextField
      id="amount-input"
      label={AMOUNT_TEXT}
      name="amount"
      value={value}
      helperText={error}
      error={Boolean(error)}
      onChange={handleChange}
      onBlur={handleBlur}
      InputProps={{
        inputComponent: CNYAmountInput as any,
      }}
    />
  );
}

export default AmountField;
