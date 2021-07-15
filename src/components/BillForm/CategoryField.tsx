import React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { CATEGORY_TEXT, NONE_TEXT } from "../../constants";
import { useApiStore } from "../../store/api.store";
import { useBillFormStore } from "../../store/billForm.store";
import { OptionDataItem } from "../../types";

const enabledPlaceholderItem: OptionDataItem = {
  value: "",
  description: NONE_TEXT,
};

function CategoryField() {
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
      InputLabelProps={{
        shrink: true,
      }}
      SelectProps={{
        displayEmpty: true,
      }}
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
