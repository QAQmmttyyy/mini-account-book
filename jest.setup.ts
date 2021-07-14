import "whatwg-fetch";
import "@testing-library/jest-dom";
import { setupDB } from "./src/apiMocks/db";
import { server } from "./src/apiMocks/server";

beforeAll(() => {
  setupDB();
  // Enable the mocking in tests.
  server.listen();
});

afterEach(() => {
  // Reset any runtime handlers tests may use.
  server.resetHandlers();
});

afterAll(() => {
  // Clean up once the tests are done.
  server.close();
});
