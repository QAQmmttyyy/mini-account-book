module.exports = {
  setupFilesAfterEnv: ["./jest.setup.ts"],
  transform: {
    "\\.csv$": "./jest.csvTransformer.js",
    "\\.[jt]sx?$": "babel-jest",
  },
};
