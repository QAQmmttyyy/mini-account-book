import React, { useEffect, useState } from "react";
import FilterSelect, { FilterSelectProps } from "../components/FilterSelect";
import { useApiStore } from "../store/api.store";
import { EMPTY_STRING } from "../constants";
import { OptionDataItem } from "../types";

interface Props {}

type ValueType = typeof EMPTY_STRING | number;

function YearFilterSelect(props: Props) {
  // 1. value
  const [value, setValue] = useState<ValueType>(EMPTY_STRING);

  const handleValueChange: FilterSelectProps["onChange"] = (event) => {
    setValue(event.target.value as number);
  };

  // 2. options data
  const [years, setYears] = useApiStore((state) => [
    state.billYears,
    state.setBillYears,
  ]);

  const optionsData: OptionDataItem[] = years
    .sort((a, b) => b - a)
    .map((year) => ({ description: year, value: year }));

  useEffect(() => {
    setYears();
  }, []);

  useEffect(() => {
    // If there is no selected option and it has year options,
    // set default select option.
    if (value === EMPTY_STRING && years.length) {
      const firstOption = optionsData[0];
      setValue(firstOption.value as number);
    }
  }, [years]);

  return (
    <FilterSelect
      placeholder="年"
      value={value}
      optionsData={optionsData}
      onChange={handleValueChange}
    />
  );
}

export default YearFilterSelect;
