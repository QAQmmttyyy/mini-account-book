import React, { useEffect } from "react";
import FilterSelect, { FilterSelectProps } from "../components/FilterSelect";
import { MONTHS, MONTH_TEXT } from "../constants";
import {
  BillSearchParamsKey,
  useUrlSearchParamsStore,
} from "../store/urlSearchParams.store";
import { OptionDataItem } from "../types";

function MonthFilterSelect() {
  const value =
    useUrlSearchParamsStore((state) =>
      state.urlSearchParams.get(BillSearchParamsKey.MONTH)
    ) ?? "";
  const updateUrlSearchParams = useUrlSearchParamsStore(
    (state) => state.updateUrlSearchParams
  );
  const setValue = updateUrlSearchParams.bind(null, BillSearchParamsKey.MONTH);
  const handleValueChange: FilterSelectProps["onChange"] = (event) => {
    setValue(event.target.value);
  };

  const optionsData: OptionDataItem[] = MONTHS.map((month) => ({
    description: `${month} ${MONTH_TEXT}`,
    value: month,
  }));

  useEffect(() => {
    // set default select option.
    if (value === "") {
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
