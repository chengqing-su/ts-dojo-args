module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageThreshold: {
    global: {
      branches: 88,
      functions: 96,
      lines: 99,
      statements: 99
    }
  }
};
