import React from "react";
import { MenuItem, Select, SelectProps } from "@material-ui/core";
import { OptionDataItem } from "../types";

interface Props extends Omit<SelectProps, "native"> {
  optionsData?: OptionDataItem[];
}

function FilterSelect({ placeholder, optionsData = [], ...restProps }: Props) {
  const hasPlaceholder = !!placeholder;
  const placeholderItem = hasPlaceholder && (
    <MenuItem value="" disabled>
      {placeholder}
    </MenuItem>
  );

  const optionItems = optionsData.map(({ value, description }) => (
    <MenuItem key={value} value={value}>
      {description}
    </MenuItem>
  ));

  return (
    <Select displayEmpty={hasPlaceholder} {...restProps}>
      {placeholderItem}
      {optionItems}
    </Select>
  );
}

export default FilterSelect;
