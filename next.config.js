const isExport = process.env.EXPORT

const config = isExport
    ? {
          images: {
              reactStrictMode: true,
              domains: ['minebarons.io'],
          },
          assetPrefix: './'
      }
    : {}

/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    ...config,
    env: {
        NEXT_PUBLIC_BACKEND: process.env.NEXT_PUBLIC_BACKEND,
        NEXT_PUBLIC_PINATA_JWT: process.env.NEXT_PUBLIC_PINATA_JWT,
        NEXT_PUBLIC_PINATA_SECRET_API_KEY: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
        NEXT_PUBLIC_PINATA_API_KEY: process.env.NEXT_PUBLIC_PINATA_API_KEY
      },
    webpack: (config) => {
        config.resolve = {
          ...config.resolve,
          fallback: {
            "fs": false,
            "path": false,
            "os": false,
          }
        }
        return config
      }
}
