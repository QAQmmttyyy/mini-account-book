import React, { useEffect } from "react";
import FilterSelect, { FilterSelectProps } from "../components/FilterSelect";
import { useApiStore } from "../store/api.store";
import { BillSearchParamsKey, EMPTY_STRING } from "../constants";
import { OptionDataItem } from "../types";
import { useUrlSearchParamsStore } from "../store/urlSearchParams.store";

interface Props {}

function YearFilterSelect(props: Props) {
  // 1. value
  const value =
    useUrlSearchParamsStore((state) =>
      state.urlSearchParams.get(BillSearchParamsKey.YEAR)
    ) ?? EMPTY_STRING;

  const updateUrlSearchParams = useUrlSearchParamsStore(
    (state) => state.updateUrlSearchParams
  );

  const setValue = updateUrlSearchParams.bind(null, BillSearchParamsKey.YEAR);

  const handleValueChange: FilterSelectProps["onChange"] = (event) => {
    setValue(event.target.value);
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
      setValue(firstOption.value);
    }
  }, [years]);

  return (
    <FilterSelect
      placeholder="年"
      name={BillSearchParamsKey.YEAR}
      value={value}
      optionsData={optionsData}
      onChange={handleValueChange}
    />
  );
}

export default YearFilterSelect;
