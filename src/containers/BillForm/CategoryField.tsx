import React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { CATEGORY_TEXT, EMPTY_STRING } from "../../constants";
import { useApiStore } from "../../store/api.store";
import { useBillFormStore } from "../../store/billForm.store";
import { OptionDataItem } from "../../types";

interface Props {}

const enabledPlaceholderItem: OptionDataItem = {
  value: EMPTY_STRING,
  description: "无",
};

function CategoryField(props: Props) {
  const value = useBillFormStore((state) => state.fields.category);
  const setField = useBillFormStore((state) => state.setField);

  const handleChange: TextFieldProps["onChange"] = (event) => {
    setField("category", event.target.value);
  };

  const categories = useApiStore((state) => state.billCategories);
  const optionsData: OptionDataItem[] = [enabledPlaceholderItem].concat(
    categories.map((category) => ({
      description: category.name,
      value: category.id,
    }))
  );

  return (
    <TextField
      id="category-select"
      label={CATEGORY_TEXT}
      name="category"
      value={value}
      onChange={handleChange}
      select
    >
      {optionsData.map(({ value, description }) => (
        <MenuItem key={value} value={value}>
          {description}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default CategoryField;