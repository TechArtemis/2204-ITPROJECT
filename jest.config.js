module.exports = {
  // ... other Jest configuration options ...
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      diagnostics: true,
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(module-to-transpile|other-module))",
  ]
};

// module.exports = {
//     moduleDirectories: ["node_modules", "src"],
//     moduleNameMapper: {
//         "^@/(.*)$": "<rootDir>/src/$1",
//         "^@pages/(.*)$": "<rootDir>/pages/$1"
//     },
//     moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
//     testMatch: ["<rootDir>/src/**/*.(spec|test).(ts|tsx)"],
//     transform: {
//         "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
//     }
// };

