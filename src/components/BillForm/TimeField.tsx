import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePickerProps,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { zhCN } from "date-fns/locale";
import { useBillFormStore } from "../../store/billForm.store";
import { isInvalidDate } from "../../utils";
import {
  CHOOSE_TIME_TEXT,
  NOT_EMPTY_TEXT,
  TIME_TEXT,
  WRONG_FORMAT_TEXT,
} from "../../constants";

function TimeField() {
  const value = useBillFormStore((state) => state.fields.time);
  const setField = useBillFormStore((state) => state.setField);

  const error = useBillFormStore((state) => state.errors.time);
  const setError = useBillFormStore((state) => state.setError);

  const handleChange: KeyboardDatePickerProps["onChange"] = (date) => {
    setField("time", date);

    if (date && !isInvalidDate(date)) {
      setError("time", "");
    }
  };
  const handleBlur: KeyboardDatePickerProps["onBlur"] = (event) => {
    const inputValue = event.target.value;
    const date = inputValue ? new Date(inputValue) : null;

    let msg;
    if (!date) {
      msg = NOT_EMPTY_TEXT;
    } else if (isInvalidDate(date)) {
      msg = WRONG_FORMAT_TEXT;
    } else {
      msg = "";
    }

    setError("time", msg);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={zhCN}>
      <KeyboardDatePicker
        id="date-picker"
        variant="inline"
        format="yyyy/MM/dd"
        label={TIME_TEXT}
        name="time"
        value={value}
        helperText={error}
        error={Boolean(error)}
        onChange={handleChange}
        onBlur={handleBlur}
        KeyboardButtonProps={{
          "aria-label": CHOOSE_TIME_TEXT,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        disableToolbar
        autoOk
        required
      />
    </MuiPickersUtilsProvider>
  );
}

export default TimeField;
