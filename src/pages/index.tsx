import React, { useState, ChangeEvent } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import { getDecimals, getTokenAmount, getTokenPairAddress } from "@/services";
import { TokenPairInfoType } from "@/types/types";
import { Dex } from "@/types/enums";
import Table from "@/components/molecules/Table";
import Card from "@/components/atoms/Card/Card";

const Home = () => {
  const [tokens, setTokens] = useState({
    tokenA: "",
    tokenB: "",
  });
  const [tokenPairInfo, setTokenPairInfo] = useState<TokenPairInfoType[]>();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTokens((prevTokens) => ({ ...prevTokens, [name]: value }));
  };

  const handleClick = async () => {
    setLoading(true);

    try {
      const promises = Object.keys(Dex).map(async (key) => {
        const pairAddress = await getTokenPairAddress(
          tokens.tokenA,
          tokens.tokenB,
          key
        );
        const tokenAAmount =
          parseInt(await getTokenAmount(tokens.tokenA, pairAddress)) /
          10 ** parseInt(await getDecimals(tokens.tokenA, key));

        const tokenBAmount =
          parseInt(await getTokenAmount(tokens.tokenB, pairAddress)) /
          10 ** parseInt(await getDecimals(tokens.tokenB, key));

        return { type: key, pairAddress, tokenAAmount, tokenBAmount };
      });

      const results = await Promise.all(promises);

      setTokenPairInfo(results);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-center text-6xl mt-40 font-bold tracking-widest">
        UNIZEN
      </h1>
      <Card>
        <div className="flex items-end w-full gap-8 justify-between">
          <Input
            name="tokenA"
            label="Token A"
            value={tokens.tokenA}
            onChange={handleChange}
          />
          <Input
            name="tokenB"
            label="Token B"
            value={tokens.tokenB}
            onChange={handleChange}
          />
          <Button name="get" onClick={handleClick} disabled={loading}>
            {loading ? "Loading..." : "GET INFO"}
          </Button>
        </div>
        {tokenPairInfo && <Table data={tokenPairInfo} />}
      </Card>
      <ToastContainer />
    </>
  );
};

export default Home;
