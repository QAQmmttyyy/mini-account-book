import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./jest.setup.ts"],
  transform: {
    "\\.csv$": "./jest.csvTransformer.js",
    "\\.[jt]sx?$": "babel-jest",
  },
};

export default config;
