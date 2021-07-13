import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import { useAppStore } from "../store/app.store";
import { GOT_IT_TEXT } from "../constants";

function AppMsg() {
  const msg = useAppStore((state) => state.msg);
  const setMsg = useAppStore((state) => state.setMsg);
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
          {GOT_IT_TEXT}
        </Button>
      }
    />
  );
}

export default AppMsg;
