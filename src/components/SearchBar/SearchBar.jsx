import React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-60 sm:w-40 flex items-center px-2 bg-gray-200 rounded-full">
      <input
        type="text"
        placeholder="Search Notes Here..."
        className="px-2 py-2 text-xs w-full outline-none"
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoMdClose
          className="text-black text-xl cursor-pointer mr-3"
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass
        className="text-gray-400 cursor-pointer hover:text-black mr-3"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
