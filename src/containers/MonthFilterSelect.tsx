import React, { useState } from "react";
import FilterSelect, { FilterSelectProps } from "../components/FilterSelect";
import { MONTHS } from "../constants";
import { OptionDataItem } from "../types";

interface Props {}

function MonthFilterSelect({}: Props) {
  // 1. value
  const firstMonth = MONTHS[0];
  const [value, setValue] = useState<string>(firstMonth);

  const handleValueChange: FilterSelectProps["onChange"] = (event) => {
    setValue(event.target.value as string);
  };

  // 2. options data
  const optionsData: OptionDataItem[] = MONTHS.map((month) => ({
    description: month,
    value: month,
  }));

  return (
    <FilterSelect
      placeholder="月"
      value={value}
      optionsData={optionsData}
      onChange={handleValueChange}
    />
  );
}

export default MonthFilterSelect;
