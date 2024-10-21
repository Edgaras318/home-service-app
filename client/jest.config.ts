export default {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "^@/(.*)$": "<rootDir>/src/$1",
        collectCoverage: true, // Enables coverage collection
        coverageDirectory: 'coverage', // Directory where Jest stores coverage reports
        coverageReporters: ['lcov', 'text', 'html'], // Report formats
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
