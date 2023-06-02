import React from "react";

export type TokenPairInfoType = {
  type: string;
  pairAddress: string;
  tokenAAmount: number;
  tokenBAmount: number;
};

export type TableDataType = {
  data?: TokenPairInfoType[];
};

export type CardPropType = {
  children: React.ReactNode;
};
