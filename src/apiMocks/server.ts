import { setupServer } from "msw/node";
import { handlers } from "./handlers";
import { initDB } from "./db";

initDB();

// Setup requests interception using the given handlers.
export const server = setupServer(...handlers);
