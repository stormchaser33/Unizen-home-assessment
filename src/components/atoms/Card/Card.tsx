import { CardPropType } from "@/types/types";
import React from "react";

const Card: React.FC<CardPropType> = (props) => {
  return (
    <div className="p-5 max-w-5xl mt-40 rounded overflow-hidden shadow-lg z-50 bg-white min-w-card">
      {props.children}
    </div>
  );
};

export default Card;
