// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }



module.exports = {
  // pageExtensions: ['js', 'jsx', 'mdx'], // Add additional file extensions here
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};
