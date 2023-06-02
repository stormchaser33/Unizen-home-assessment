import { CardPropType } from "@/types/types";
import React from "react";

const Card: React.FC<CardPropType> = (props) => {
  return (
    <div className="p-5 mx-80 mt-40 rounded overflow-hidden shadow-lg z-50 bg-white">
      {props.children}
    </div>
  );
};

export default Card;
