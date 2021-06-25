import React from "react";
import { MenuItem, Select, SelectProps } from "@material-ui/core";
import { OptionDataItem } from "../types";
import { EMPTY_STRING } from "../constants";

export interface FilterSelectProps extends Omit<SelectProps, "native"> {
  optionsData?: OptionDataItem[];
}

function FilterSelect({
  placeholder,
  optionsData = [],
  ...restProps
}: FilterSelectProps) {
  const hasPlaceholder = !!placeholder;
  const placeholderItem = hasPlaceholder && (
    <MenuItem value={EMPTY_STRING} disabled>
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
