import React from 'react';

export function Table({ children }) {
  return (
    <table className="min-w-full bg-white border border-gray-200">
      {children}
    </table>
  );
}

export function TableHeader({ children }) {
  return (
    <thead className="bg-gray-100 border-b">
      {children}
    </thead>
  );
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }) {
  return <tr>{children}</tr>;
}

export function TableHead({ children }) {
  return <th className="text-left p-2 border-b">{children}</th>;
}

export function TableCell({ children }) {
  return <td className="p-2 border-b">{children}</td>;
}
