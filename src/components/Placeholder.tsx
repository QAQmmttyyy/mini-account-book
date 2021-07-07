import React, { HTMLAttributes, ReactNode } from "react";
import { makeStyles } from "@material-ui/core/styles";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
});

function Placeholder({ className = "", children, ...restProps }: Props) {
  const classes = useStyles();
  return (
    <div className={`${classes.root} ${className}`} {...restProps}>
      {children}
    </div>
  );
}

export default Placeholder;
