import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup, { RadioGroupProps } from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { EXPENDITURE_TEXT, INCOME_TEXT } from "../../constants";
import { useBillFormStore } from "../../store/billForm.store";

interface Props {}

function TypeField(props: Props) {
  const value = useBillFormStore((state) => state.fields.type);
  const setField = useBillFormStore((state) => state.setField);

  const handleChange: RadioGroupProps["onChange"] = (event) => {
    setField("type", Number(event.target.value));
  };

  return (
    <FormControl>
      <RadioGroup name="type" value={value} onChange={handleChange} row>
        <FormControlLabel
          value={0 as typeof value}
          label={EXPENDITURE_TEXT}
          control={<Radio size="small" color="primary" />}
        />
        <FormControlLabel
          value={1 as typeof value}
          label={INCOME_TEXT}
          control={<Radio size="small" color="primary" />}
        />
      </RadioGroup>
    </FormControl>
  );
}

export default TypeField;
