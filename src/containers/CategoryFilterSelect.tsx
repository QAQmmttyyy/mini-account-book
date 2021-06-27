import React, { useEffect } from "react";
import FilterSelect, { FilterSelectProps } from "../components/FilterSelect";
import {
  BillSearchParamsKey,
  EMPTY_STRING,
  ExtraCategoryValue,
} from "../constants";
import { useApiStore } from "../store/api.store";
import { useUrlSearchParamsStore } from "../store/urlSearchParams.store";
import { OptionDataItem } from "../types";

interface Props {}

const localExtraCategoryOptionsData: OptionDataItem[] = [
  { value: ExtraCategoryValue.ALL, description: "全部分类" },
  { value: ExtraCategoryValue.NONE, description: "未分类" },
];

function CategoryFilterSelect(props: Props) {
  // 1. value
  const value =
    useUrlSearchParamsStore((state) =>
      state.urlSearchParams.get(BillSearchParamsKey.CATEGORY)
    ) ?? EMPTY_STRING;

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
    if (value === EMPTY_STRING) {
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
