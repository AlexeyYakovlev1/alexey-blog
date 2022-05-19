module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  env: {
      API_URL: "http://192.168.1.118:3000/api",
      PROJECT_ROOT: __dirname
  }
};