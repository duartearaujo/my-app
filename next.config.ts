import type { NextConfig } from "next";
import { rule } from "postcss";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.glsl': {
          loaders: ['raw-loader', 'glslify-loader'],
          as: '*.ts'
        }
      }
    }
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.glsl$/,
      use: ['raw-loader', 'glslify-loader'],
    });
    return config;
  },
};

export default nextConfig;
