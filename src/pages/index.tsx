import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import {
  getDecimals,
  getTokenAmount,
  getTokenPairAddress,
} from "@/services/tokenInfo";
import React, { useState, useEffect, ChangeEvent } from "react";

enum Dex {
  UniswapV2 = "UniswapV2",
  UniswapV3 = "UniswapV3",
  Sushi = "Sushi",
}

export default function Home() {
  const [tokens, setTokens] = useState({
    tokenA: "",
    tokenB: "",
  });
  const [tokenPairInfo, setTokenPairInfo] = useState({
    UniswapV2: {
      pairAddress: "",
      tokenAAmount: null,
      tokenBAmount: null,
    },
    UniswapV3: {
      pairAddress: "",
      tokenAAmount: null,
      tokenBAmount: null,
    },
    Sushi: {
      pairAddress: "",
      tokenAAmount: null,
      tokenBAmount: null,
    },
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTokens({ ...tokens, [e.target.name]: e.target.value });
  };

  const onClick = async () => {
    console.log(Dex);

    Object.keys(Dex).forEach(async (key) => {
      const pairAddress = await getTokenPairAddress(
        tokens.tokenA,
        tokens.tokenB,
        key
      );
      const tokenAAmount =
        parseInt(await getTokenAmount(tokens.tokenA, pairAddress)) /
        Math.pow(10, parseInt(await getDecimals(tokens.tokenA, key)));

      const tokenBAmount =
        parseInt(await getTokenAmount(tokens.tokenB, pairAddress)) /
        Math.pow(10, parseInt(await getDecimals(tokens.tokenB, key)));

      setTokenPairInfo((prevState) => ({
        ...prevState,
        [key]: { pairAddress, tokenAAmount, tokenBAmount },
      }));
    });

    // const pairAddress = await getTokenPairAddress(
    //   tokens.tokenA,
    //   tokens.tokenB,
    //   "UniswapV3"
    // );

    // console.log("token pair address", pairAddress);
    // console.log(
    //   "reserve amount",
    //   parseInt(await getTokenAmount(tokens.tokenA, pairAddress)) /
    //     Math.pow(10, parseInt(await getDecimals(tokens.tokenA, "UniswapV3")))
    // );
    // setTokenPairInfo(pairAddress);
  };

  console.log(tokenPairInfo);

  return (
    <>
      <div>
        <Button name="test" onClick={onClick}>
          Button
        </Button>
        <Input
          name="tokenA"
          label="tokenA"
          value={tokens.tokenA}
          onChange={onChange}
        />
        <Input
          name="tokenB"
          label="tokenB"
          value={tokens.tokenB}
          onChange={onChange}
        />
      </div>
    </>
  );
}
