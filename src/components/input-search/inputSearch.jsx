/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

export default function InputSearch({ func, placeholder, setState }) {
  const [cari, setCari] = useState("");

  const handleSearch = () => {
    setState(cari);
    func(cari);
  };

  return (
    <div className="w-full h-max flex flex-col rounded-md items-center py-3 gap-2">
      <div className="w-full h-max">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <IoIosSearch size={20} fill="white" />
          </div>
          <input
            type="search"
            id="default-search"
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={`Cari ${placeholder}`}
            required=""
          />
          <button
            type="button"
            onClick={handleSearch}
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
