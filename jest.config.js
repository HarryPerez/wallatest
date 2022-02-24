module.exports = {
  collectCoverageFrom: [
    'src/**/*.js',
    '!.eslintrc.js',
    '!jest.config.js',
    '!**/tests/**',
    '!**/styles.js',
    '!**/node_modules/**',
    '!**/build/**',
    '!**/propTypes/**',
    '!**/constants/**',
    '!**/lottieAssets/**',
    '!**/public/**',
    '!**/coverage/**',
  ],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.jsx?$': './node_modules/babel-jest',
  },
  coverageDirectory: 'coverage',
  clearMocks: true,
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },
};
