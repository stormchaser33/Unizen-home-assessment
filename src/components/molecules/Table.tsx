import { HiOutlineDuplicate } from "react-icons/hi";
import copy from "clipboard-copy";
import React from "react";
import { toast } from "react-toastify";
import { TableDataType } from "@/types/types";

const Table: React.FC<TableDataType> = ({ data }) => {
  const copyToClipboard = (pairAddress: string) => {
    copy(pairAddress);
    toast("Pair Address is Copied");
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Pair Address
                    </th>
                    <th scope="col" className="px-6 py-4">
                      TokenA Amount
                    </th>
                    <th scope="col" className="px-6 py-4">
                      TokenB Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item, index) => (
                    <tr
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                      key={item.pairAddress}
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {item.type}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 relative justify-start flex">
                        <div className="truncate pr-6">{item.pairAddress}</div>
                        <button
                          onClick={() => copyToClipboard(item.pairAddress)}
                          className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                          <HiOutlineDuplicate className="h-5 w-5" />
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.tokenAAmount}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item.tokenBAmount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
