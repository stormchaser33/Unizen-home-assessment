/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  ...nextConfig,
  env: {
    UNISWAP_V2: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    UNISWAP_V3: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
    SUSHISWAP: "0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac",
  },
};
