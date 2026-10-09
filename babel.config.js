/**
 * babel.config.js — Metro resolver for the Clickable Screenshots Expo app.
 */
module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "react-native" }],
    ],
  };
};
