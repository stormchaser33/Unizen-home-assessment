import { ethers } from "ethers";
import v2ABI from "@/config/UniswapV2FactoryABI.json";
import v3ABI from "@/config/UniswapV3FactoryABI.json";
import sushiABI from "@/config/SushiswapFactoryABI.json";
import erc20ABI from "@/config/erc20ABI.json";

type FactoryType = {
  [key: string]: {
    tokenAddress: string | undefined;
    ABI: typeof v2ABI | typeof v3ABI | typeof sushiABI;
  };
};

const factoryAddresses: FactoryType = {
  UniswapV2: { tokenAddress: process.env.UNISWAP_V2, ABI: v2ABI },
  UniswapV3: { tokenAddress: process.env.UNISWAP_V3, ABI: v3ABI },
  Sushi: { tokenAddress: process.env.SUSHISWAP, ABI: sushiABI },
};

const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-mainnet.g.alchemy.com/v2/3lstPHmIFYnLuda1piG8fwVXL0dNxs-6"
);

export const getTokenPairAddress = async (
  tokenA: string,
  tokenB: string,
  type: string
): Promise<string> => {
  const { tokenAddress, ABI } = factoryAddresses[type];
  console.log("Factory Address:", tokenAddress);
  const factoryContract = new ethers.Contract(
    tokenAddress as string,
    ABI,
    provider
  );

  const pairAddress =
    type === "UniswapV3"
      ? await factoryContract.getPool(tokenA, tokenB, 10000)
      : await factoryContract.getPair(tokenA, tokenB);

  return pairAddress;
};

export const getTokenAmount = async (token: string, pairAddress: string) => {
  const erc20Contract = new ethers.Contract(token, erc20ABI, provider);

  const balance = await erc20Contract.balanceOf(pairAddress);
  return balance;
};

export const getDecimals = async (token: string) => {
  const erc20Contract = new ethers.Contract(token, erc20ABI, provider);

  const decimals = await erc20Contract.decimals();

  return decimals;
};
