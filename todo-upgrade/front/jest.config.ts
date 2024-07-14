import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest", // Babel이 아닌 Typescript 환경에서 테스트
  testEnvironment: "jsdom",
  verbose: true,
  testMatch: ["**/tests/**/*.test.ts?(x)"],
  // @는 src를 가리킴
  rootDir: ".",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};

export default config;
