const nextJest = require("next/jest.js");

const createJstConfig = nextJest({
  dir: './',
});

const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
};

module.exports = createJstConfig(config);