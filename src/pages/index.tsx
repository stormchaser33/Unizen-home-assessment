import React, { useState, ChangeEvent, FormEvent } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import { getDecimals, getTokenAmount, getTokenPairAddress } from "@/services";
import { TokenPairInfoType } from "@/types/types";
import { Dex } from "@/types/enums";
import Table from "@/components/molecules/Table";
import Card from "@/components/atoms/Card";

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const promises = Object.values(Dex).map(async (dex) => {
        const pairAddress = await getTokenPairAddress(
          tokens.tokenA,
          tokens.tokenB,
          dex
        );
        let tokenAAmount = 0,
          tokenBAmount = 0;
        if (parseInt(pairAddress) !== 0) {
          tokenAAmount =
            parseInt(await getTokenAmount(tokens.tokenA, pairAddress)) /
            10 ** parseInt(await getDecimals(tokens.tokenA));

          tokenBAmount =
            parseInt(await getTokenAmount(tokens.tokenB, pairAddress)) /
            10 ** parseInt(await getDecimals(tokens.tokenB));
        }

        return { type: dex, pairAddress, tokenAAmount, tokenBAmount };
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
      <div className="flex justify-center">
        <Card>
          <form
            className="flex items-end w-full gap-8 justify-between"
            onSubmit={handleSubmit}
          >
            <Input
              name="tokenA"
              label="Token A"
              value={tokens.tokenA}
              onChange={handleChange}
              required
            />
            <Input
              name="tokenB"
              label="Token B"
              value={tokens.tokenB}
              onChange={handleChange}
              required
            />
            <Button name="get" type="submit" disabled={loading}>
              {loading ? "Loading..." : "GET INFO"}
            </Button>
          </form>
          {tokenPairInfo && !loading && <Table data={tokenPairInfo} />}
        </Card>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
