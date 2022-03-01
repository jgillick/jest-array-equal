module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  testRegex: "./src/.*.test.ts$",
  testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/test/setup/",
  ],
};
