import React from "react";
import { InputProps } from "./types";

const Input: React.FC<InputProps> = (props) => {
  const { name, value, onChange, className, ...otherProps } = props;

  const base =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  const _className = className ? `${base} ${className}` : base;

  return (
    <div className="w-full flex-column">
      {otherProps.label && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {otherProps.label}
        </label>
      )}
      <input
        type="text"
        id={otherProps.id}
        className={_className}
        value={value}
        onChange={onChange}
        name={name}
        {...otherProps}
        required
      />
    </div>
  );
};

export default Input;
