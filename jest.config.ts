import nextJest from "next/jest"
import jest from "jest"

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig: jest.Config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  globalSetup: "<rootDir>/src/db/testSetup.ts",
  globalTeardown: "<rootDir>/src/db/testTeardown.ts",
  preset: "ts-jest",
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
