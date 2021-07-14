import React, { Fragment, useState } from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import CreateBillDialog from "./CreateBillDialog";

interface Props {
  buttonProps?: Omit<ButtonProps, "onClick">;
}

function CreateBillDialogControl({ buttonProps }: Props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button
        color="primary"
        variant="contained"
        onClick={handleOpen}
        disableElevation
        {...buttonProps}
      >
        创建账单
      </Button>
      <CreateBillDialog open={open} onClose={handleClose} />
    </Fragment>
  );
}

export default CreateBillDialogControl;
