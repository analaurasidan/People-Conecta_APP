const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const webpack = require('webpack');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const mockPath = (fileName) => path.resolve(__dirname, 'src/mocks', fileName);

const expoPublicEnv = Object.fromEntries(
  Object.entries(process.env)
    .filter(([key]) => key.startsWith('EXPO_PUBLIC_'))
    .map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)])
);

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve?.alias,
      'react-native-haptic-feedback': mockPath('react-native-haptic-feedback.ts'),
      'expo-apple-authentication': mockPath('expo-apple-authentication.tsx'),
      '@shopify/flash-list': mockPath('shopify-flash-list.tsx'),
    },
  };

  config.plugins.push(
    new webpack.DefinePlugin(expoPublicEnv)
  );

  return config;
};
