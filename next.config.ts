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
  }
};

export default nextConfig;
