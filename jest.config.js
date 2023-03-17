module.exports = {

    // ... other Jest configuration options ...
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.json",
            diagnostics: true,
        },
    },
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    transformIgnorePatterns: [
        "/node_modules/(?!(module-to-transpile|other-module))",
    ],
    setupFilesAfterEnv: [
        "@testing-library/jest-dom/extend-expect"
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

