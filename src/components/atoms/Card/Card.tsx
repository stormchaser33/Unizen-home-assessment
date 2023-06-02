import { CardPropType } from "@/types/types";
import React from "react";

const Card: React.FC<CardPropType> = (props) => {
  return (
    <div className="p-5 m-80 rounded overflow-hidden shadow-lg">
      {props.children}
    </div>
  );
};

export default Card;
