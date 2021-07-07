import React, { useEffect } from "react";
import FilterSelect, { FilterSelectProps } from "../components/FilterSelect";
import { BillSearchParamsKey, EMPTY_STRING, MONTHS } from "../constants";
import { useUrlSearchParamsStore } from "../store/urlSearchParams.store";
import { OptionDataItem } from "../types";

interface Props {}

function MonthFilterSelect({}: Props) {
  // 1. value
  const value =
    useUrlSearchParamsStore((state) =>
      state.urlSearchParams.get(BillSearchParamsKey.MONTH)
    ) ?? EMPTY_STRING;

  const updateUrlSearchParams = useUrlSearchParamsStore(
    (state) => state.updateUrlSearchParams
  );

  const setValue = updateUrlSearchParams.bind(null, BillSearchParamsKey.MONTH);

  const handleValueChange: FilterSelectProps["onChange"] = (event) => {
    setValue(event.target.value);
  };

  // 2. options data
  const optionsData: OptionDataItem[] = MONTHS.map((month) => ({
    description: month + " 月",
    value: month,
  }));

  useEffect(() => {
    // set default select option.
    if (value === EMPTY_STRING) {
      const firstOption = optionsData[0];
      setValue(firstOption.value);
    }
  }, []);

  return (
    <FilterSelect
      name={BillSearchParamsKey.MONTH}
      value={value}
      optionsData={optionsData}
      onChange={handleValueChange}
    />
  );
}

export default MonthFilterSelect;
