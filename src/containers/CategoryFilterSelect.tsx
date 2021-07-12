import React, { useEffect } from "react";
import FilterSelect, { FilterSelectProps } from "../components/FilterSelect";
import { ALL_CATEGORY_TEXT, NO_CATEGORY_TEXT } from "../constants";
import { ExtraCategoryValue } from "../enums";
import { useApiStore } from "../store/api.store";
import {
  BillSearchParamsKey,
  useUrlSearchParamsStore,
} from "../store/urlSearchParams.store";
import { OptionDataItem } from "../types";

const localExtraCategoryOptionsData: OptionDataItem[] = [
  { value: ExtraCategoryValue.ALL, description: ALL_CATEGORY_TEXT },
  { value: ExtraCategoryValue.NONE, description: NO_CATEGORY_TEXT },
];

function CategoryFilterSelect() {
  // 1. value
  const value =
    useUrlSearchParamsStore((state) =>
      state.urlSearchParams.get(BillSearchParamsKey.CATEGORY)
    ) ?? "";

  const updateUrlSearchParams = useUrlSearchParamsStore(
    (state) => state.updateUrlSearchParams
  );

  const setValue = updateUrlSearchParams.bind(
    null,
    BillSearchParamsKey.CATEGORY
  );

  const handleValueChange: FilterSelectProps["onChange"] = (event) => {
    setValue(event.target.value);
  };

  // 2. options data
  const [categories, setCategories] = useApiStore((state) => [
    state.billCategories,
    state.setBillCategories,
  ]);

  const optionsData: OptionDataItem[] = localExtraCategoryOptionsData.concat(
    categories.map((category) => ({
      description: category.name,
      value: category.id,
    }))
  );

  useEffect(() => {
    setCategories();
  }, []);

  useEffect(() => {
    // set default select option.
    if (value === "") {
      const firstOption = optionsData[0];
      setValue(firstOption.value);
    }
  }, []);

  return (
    <FilterSelect
      name={BillSearchParamsKey.CATEGORY}
      value={value}
      optionsData={optionsData}
      onChange={handleValueChange}
    />
  );
}

export default CategoryFilterSelect;
