module.exports = (api) => {
  const DEVELOPMENT = process.env.NODE_ENV === 'development';
  api.cache.using(() => process.env.NODE_ENV);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          corejs: '3',
          useBuiltIns: 'usage',
        },
      ],
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    plugins: [DEVELOPMENT && 'react-hot-loader/babel'].filter(Boolean),
  };
};
