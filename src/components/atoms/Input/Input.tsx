import React, { useRef } from "react";
import { HiOutlineDuplicate } from "react-icons/hi";
import copy from "clipboard-copy";
import { InputProps } from "@/types/interfaces";
import { toast } from "react-toastify";

const Input: React.FC<InputProps> = (props) => {
  const { name, value, onChange, className, ...otherProps } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const base =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 truncate pr-8";
  const _className = className ? `${base} ${className}` : base;

  const copyToClipboard = () => {
    if (inputRef.current) {
      copy(inputRef.current.value);
      toast("Token Address is Copied");
    }
  };

  return (
    <div className="flex-column w-96 relative">
      {otherProps.label && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {otherProps.label}
        </label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          id={otherProps.id}
          className={_className}
          value={value}
          onChange={onChange}
          name={name}
          {...otherProps}
          required
        />
        <button
          onClick={copyToClipboard}
          className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <HiOutlineDuplicate className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Input;
