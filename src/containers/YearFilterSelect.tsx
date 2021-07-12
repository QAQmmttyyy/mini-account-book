import React, { useEffect } from "react";
import FilterSelect, { FilterSelectProps } from "../components/FilterSelect";
import { useApiStore } from "../store/api.store";
import { YEAR_TEXT } from "../constants";
import { OptionDataItem } from "../types";
import {
  BillSearchParamsKey,
  useUrlSearchParamsStore,
} from "../store/urlSearchParams.store";

function YearFilterSelect() {
  const value =
    useUrlSearchParamsStore((state) =>
      state.urlSearchParams.get(BillSearchParamsKey.YEAR)
    ) ?? "";
  const updateUrlSearchParams = useUrlSearchParamsStore(
    (state) => state.updateUrlSearchParams
  );
  const setValue = updateUrlSearchParams.bind(null, BillSearchParamsKey.YEAR);
  const handleValueChange: FilterSelectProps["onChange"] = (event) => {
    setValue(event.target.value);
  };

  const [years, setYears] = useApiStore((state) => [
    state.billYears,
    state.setBillYears,
  ]);
  const optionsData: OptionDataItem[] = years
    .sort((a, b) => b - a)
    .map((year) => ({ description: `${year} ${YEAR_TEXT}`, value: year }));

  useEffect(() => {
    setYears();
  }, []);

  // Update years after creating bill.
  const bill = useApiStore((state) => state.bill);
  useEffect(() => {
    if (bill && !years.includes(new Date(bill.time).getFullYear())) {
      setYears();
    }
  }, [bill]);

  useEffect(() => {
    // If there is no selected option and it has year options,
    // set default select option.
    if (value === "" && years.length) {
      const firstOption = optionsData[0];
      setValue(firstOption.value);
    }
  }, [years]);

  return (
    <FilterSelect
      name={BillSearchParamsKey.YEAR}
      value={value}
      optionsData={optionsData}
      onChange={handleValueChange}
    />
  );
}

export default YearFilterSelect;
