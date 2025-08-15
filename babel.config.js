module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Use the new worklets plugin for React Native Reanimated
      'react-native-worklets/plugin',
    ],
  };
};
