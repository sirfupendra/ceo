// Select.jsx

import React from 'react';

export function Select({ onValueChange, defaultValue, children }) {
  const handleChange = (event) => {
    onValueChange(event.target.value);
  };

  return (
    <select onChange={handleChange} defaultValue={defaultValue} className="w-full">
      {children}
    </select>
  );
}

export function SelectTrigger({ children, ...props }) {
  return (
    <option {...props}>
      {children}
    </option>
  );
}

export function SelectContent({ children }) {
  return (
    <>
      {children}
    </>
  );
}

export function SelectItem({ value, children }) {
  return (
    <option value={value}>
      {children}
    </option>
  );
}

export function SelectValue({ placeholder }) {
  return (
    <option value="" disabled>
      {placeholder}
    </option>
  );
}
