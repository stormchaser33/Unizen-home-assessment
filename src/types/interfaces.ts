import React from "react";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {}
export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
}
