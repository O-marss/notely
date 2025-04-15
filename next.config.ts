const isGithubPages = process.env.NODE_ENV === "production";

module.exports = {
  basePath: isGithubPages ? "/notely" : "",
  assetPrefix: isGithubPages ? "/notely/" : "",
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};
