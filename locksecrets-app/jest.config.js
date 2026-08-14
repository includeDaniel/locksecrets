/** @type {import('jest').Config} */
module.exports = {
    preset: "jest-expo",
    setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
    },
    collectCoverageFrom: [
        "models/**/*.ts",
        "viewmodels/**/*.ts",
        "views/**/*.tsx",
        "components/**/*.tsx",
    ],
};
