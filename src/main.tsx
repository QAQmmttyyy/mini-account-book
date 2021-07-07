import React from "react";
import ReactDom from "react-dom";
import { initDB } from "./apiMocks/db";
import { worker } from "./apiMocks/browser";
import App from "./App";

initDB();
worker.start();

ReactDom.render(<App />, document.getElementById("root"));
