module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  //   preset: 'react-native',
  //   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
