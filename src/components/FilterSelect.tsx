import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Select, { SelectProps } from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { OptionDataItem } from "../types";
import { EMPTY_STRING } from "../constants";

export interface FilterSelectProps extends Omit<SelectProps, "native"> {
  optionsData?: OptionDataItem[];
}

const useStyles = makeStyles({
  InputRoot: {
    marginRight: 8,
  },
  select: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      borderRadius: 4,
    },
    "&:focus": {
      backgroundColor: "initial",
      borderRadius: 4,
    },
  },
});

function FilterSelect({
  placeholder,
  optionsData = [],
  ...restProps
}: FilterSelectProps) {
  const classes = useStyles();
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
    <Select
      className={classes.InputRoot}
      classes={{ select: classes.select }}
      displayEmpty={hasPlaceholder}
      disableUnderline
      {...restProps}
    >
      {placeholderItem}
      {optionItems}
    </Select>
  );
}

export default FilterSelect;
