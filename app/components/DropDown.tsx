'use client'

import React from 'react';

interface Option {
  _id: string;
  name: string;
}

interface DropDownProps {
  list: Option[];
  onChange: (value: string) => void;
  selected: string;
  name: string;
}

const DropDown: React.FC<DropDownProps> = ({ list, onChange, selected, name }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className='text-field flex gap-2 justify-center items-center'>
      <label className='font-bold capitalize'>{name}</label>
      <select
        name={name}
        onChange={handleChange}
        value={selected}
        className="flex-grow p-2 rounded-lg"
      >
        {list.map((option, index) => (
          <option
            key={index}
            value={option._id}
            className={selected === option._id ? "bg-gray-400" : ""}
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
