import React, { useEffect, useState } from "react";
import FilterSelect, { FilterSelectProps } from "../components/FilterSelect";
import { ExtraCategoryValue } from "../constants";
import { useApiStore } from "../store/api.store";
import { OptionDataItem } from "../types";

interface Props {}

const localExtraCategoryOptionsData: OptionDataItem[] = [
  { value: ExtraCategoryValue.ALL, description: "全部分类" },
  { value: ExtraCategoryValue.NONE, description: "未分类" },
];

function CategoryFilterSelect(props: Props) {
  // 1. value
  const [value, setValue] = useState<string>(ExtraCategoryValue.ALL);

  const handleValueChange: FilterSelectProps["onChange"] = (event) => {
    setValue(event.target.value as string);
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

  return (
    <FilterSelect
      value={value}
      optionsData={optionsData}
      onChange={handleValueChange}
    />
  );
}

export default CategoryFilterSelect;
