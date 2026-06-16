const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Prefer React Native/CommonJS package entrypoints on web when a dependency
// exposes ESM builds that Metro cannot safely transform for browsers.
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
