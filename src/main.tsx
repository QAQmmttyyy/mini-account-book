import React from "react";
import ReactDom from "react-dom";
import { worker } from "./apiMocks/browser";
import App from "./App";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

ReactDom.render(<App />, document.getElementById("root"));
