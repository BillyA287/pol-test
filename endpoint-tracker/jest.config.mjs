/** @type {import("jest").Config} **/
export default {
  testEnvironment: "jsdom", 
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.app.json" }], 
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], 
  moduleDirectories: ["node_modules", "<rootDir>/"], 
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", 
  },
};