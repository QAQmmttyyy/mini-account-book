import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AmountField from "./BillForm/AmountField";
import CategoryField from "./BillForm/CategoryField";
import TimeField from "./BillForm/TimeField";
import TypeField from "./BillForm/TypeField";
import { useBillFormStore } from "../store/billForm.store";
import { useApiStore } from "../store/api.store";
import {
  CANCEL_TEXT,
  CONFIRM_TEXT,
  CREATE_BILL_TEXT,
  NOT_EMPTY_TEXT,
} from "../constants";
import { Bill } from "../types";
import { getInvalidRequiredFieldKey } from "../helpers";

interface CreateBillDialogProps {
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles({
  scrollPaper: {
    alignItems: "flex-start",
  },
  dialogContentRoot: {
    width: 448,
  },
});

function CreateBillDialog({ open, onClose }: CreateBillDialogProps) {
  const classes = useStyles();

  const handleExited = () => {
    useBillFormStore.getState().reset();
  };
  const handleOk = async () => {
    // Avoid subscribing, because there is no need to re-render this comp
    // when these states change. And the states will be guaranteed to be up to date.
    const { errors, fields, setError } = useBillFormStore.getState();

    if (Object.values(errors).some((error) => Boolean(error))) {
      return;
    }

    // Handle case: directly click confirm button.
    const keyOfInvalidField = getInvalidRequiredFieldKey(fields, [
      "time",
      "amount",
      "type",
    ] as (keyof typeof fields)[]);
    if (keyOfInvalidField) {
      setError(keyOfInvalidField as any, NOT_EMPTY_TEXT);
      return;
    }

    const data: Bill = {
      time: fields.time!.getTime(),
      category: fields.category || undefined,
      type: fields.type,
      amount: Number(fields.amount),
    };
    await useApiStore.getState().createBill(data);

    onClose();
  };

  return (
    <Dialog
      classes={{
        scrollPaper: classes.scrollPaper,
      }}
      open={open}
      onClose={onClose}
      onExited={handleExited}
      aria-labelledby="create-bill-dialog-title"
    >
      <DialogTitle id="create-bill-dialog-title">
        {CREATE_BILL_TEXT}
      </DialogTitle>
      <DialogContent className={classes.dialogContentRoot}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TypeField />
          </Grid>
          <Grid item>
            <TimeField />
          </Grid>
          <Grid item>
            <CategoryField />
          </Grid>
          <Grid item>
            <AmountField />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{CANCEL_TEXT}</Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleOk}
          disableElevation
        >
          {CONFIRM_TEXT}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateBillDialog;
