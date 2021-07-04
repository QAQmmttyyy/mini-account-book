import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { useBillFormStore } from "../store/billForm.store";
import { Bill } from "../types";
import { createBill } from "../api";
import AmountField from "./BillForm/AmountField";
import CategoryField from "./BillForm/CategoryField";
import TimeField from "./BillForm/TimeField";
import TypeField from "./BillForm/TypeField";
import { CANCEL_TEXT, CONFIRM_TEXT, CREATE_BILL_TEXT } from "../constants";

interface CreateBillDialogProps {
  open: boolean;
  onClose: () => void;
}

function CreateBillDialog({ open, onClose }: CreateBillDialogProps) {
  const handleExited = () => {
    useBillFormStore.getState().reset();
  };
  const handleOk = async () => {
    // Avoid subscribing, because there is no need to re-render this comp
    // when these states change. And the states will be guaranteed to be up to date.
    const { errors, fields } = useBillFormStore.getState();

    if (Object.values(errors).some((error) => Boolean(error))) {
      return;
    }

    const data: Bill = {
      time: fields.time!.getTime(),
      category: fields.category || undefined,
      type: fields.type,
      amount: Number(fields.amount),
    };

    await createBill(data);

    // TODO: Set "addedFlag"

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onExited={handleExited}
      aria-labelledby="create-bill-dialog-title"
    >
      <DialogTitle id="create-bill-dialog-title">
        {CREATE_BILL_TEXT}
      </DialogTitle>
      <DialogContent>
        {<TimeField />}
        {<CategoryField />}
        {<TypeField />}
        {<AmountField />}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{CANCEL_TEXT}</Button>
        <Button onClick={handleOk} color="primary">
          {CONFIRM_TEXT}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateBillDialog;
