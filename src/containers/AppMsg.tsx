import React from "react";
import Snackbar, { SnackbarProps } from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import { useAppStore } from "../store/app.store";

function AppMsg() {
  const msg = useAppStore((state) => state.msg);
  const setMsg = useAppStore((state) => state.setMsg);

  const handleClose: SnackbarProps["onClose"] = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMsg(null);
  };
  const handleClickAction = () => {
    setMsg(null);
  };

  return (
    <Snackbar
      message={msg}
      open={Boolean(msg)}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      action={
        <Button color="secondary" size="small" onClick={handleClickAction}>
          知道了
        </Button>
      }
      onClose={handleClose}
    />
  );
}

export default AppMsg;
