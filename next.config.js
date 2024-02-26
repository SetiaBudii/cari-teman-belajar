/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Pushing external modules to config.externals
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil"
    });

    return config; // Return modified config
  },
  images: {
    domains: [
      "uploadthing.com",
      "utfs.io"
    ]
  },
  async headers() {
    return [
      {
        // Routes this applies to
        source: "/api/(.*)",
        // Headers
        headers: [
          // Allow for specific domains to have access or * for all
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.ALLOWED_ORIGIN || "*", // Use ALLOWED_ORIGIN or fallback to *
          },
          // Allows for specific methods accepted
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          // Allows for specific headers accepted
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  }
};

module.exports = nextConfig;
