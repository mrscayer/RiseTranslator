module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        baseUrl: './',
        alias: {
          '@components': './src/components',
          '@constants': './src/constants',
          '@contexts': './src/contexts',
          '@data': './src/data',
          '@models': './src/models',
          '@navigations': './src/navigations',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@src': './src',
        },
      },
    ],
  ],
};
