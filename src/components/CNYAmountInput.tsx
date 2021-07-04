import React from "react";
import NumberFormat, { NumberFormatProps } from "react-number-format";

export interface CNYAmountInputProps {
  name?: string;
  inputRef: NumberFormatProps["getInputRef"];
  onChange: (event: { target: { name?: string; value: string } }) => void;
}

function CNYAmountInput(props: CNYAmountInputProps) {
  const { inputRef, onChange, ...restProps } = props;

  const handleValueChange: NumberFormatProps["onValueChange"] = (values) => {
    onChange({
      target: {
        name: props.name,
        value: values.value,
      },
    });
  };

  return (
    <NumberFormat
      {...restProps}
      getInputRef={inputRef}
      prefix="￥"
      decimalScale={2}
      thousandsGroupStyle="wan"
      onValueChange={handleValueChange}
      isNumericString
      thousandSeparator
    />
  );
}

export default CNYAmountInput;
