import React from "react";

interface SortDropdownProps {
  sortBy: string;
  setSortBy: (value: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ sortBy, setSortBy }) => (
  <div className="relative inline-block w-60">
    <select
      value={sortBy}
      onChange={e => setSortBy(e.target.value)}
      className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      <option value="date-asc">Date: Oldest First</option>
      <option value="date-desc">Date: Newest First</option>
      <option value="attendees-asc">Attendees: Fewest First</option>
      <option value="attendees-desc">Attendees: Most First</option>
      <option value="name-asc">Name: A to Z</option>
      <option value="name-desc">Name: Z to A</option>
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M7 7l3-3 3 3m0 6l-3 3-3-3"/></svg>
    </div>
  </div>
);

export default SortDropdown;
