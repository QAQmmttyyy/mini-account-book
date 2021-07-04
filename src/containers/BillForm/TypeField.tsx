import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup, { RadioGroupProps } from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { EXPENDITURE_TEXT, INCOME_TEXT, TYPE_TEXT } from "../../constants";
import { useBillFormStore } from "../../store/billForm.store";

interface Props {}

function TypeField(props: Props) {
  const value = useBillFormStore((state) => state.fields.type);
  const setField = useBillFormStore((state) => state.setField);

  const handleChange: RadioGroupProps["onChange"] = (event) => {
    setField("type", Number(event.target.value));
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{TYPE_TEXT}</FormLabel>
      <RadioGroup name="type" value={value} onChange={handleChange}>
        <FormControlLabel
          value={0 as typeof value}
          label={EXPENDITURE_TEXT}
          control={<Radio />}
        />
        <FormControlLabel
          value={1 as typeof value}
          label={INCOME_TEXT}
          control={<Radio />}
        />
      </RadioGroup>
    </FormControl>
  );
}

export default TypeField;
