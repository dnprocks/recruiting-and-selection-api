export default {
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testMatch: ['**/__tests__/**/*.[t]s?(x)', '**/?(*.)+(spec|test).[t]s?(x)'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
};
