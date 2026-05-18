import { useState } from 'react';

const SearchTotalGuestField = () => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const adultOptions = Array.from({ length: 4 }, (_, i) => i + 1);
  const childrenOptions = Array.from({ length: 5 }, (_, i) => i);

  return (
    <>
      <div className="flex-1 text-left min-w-[150px]">
        <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
          Adults
        </label>
        <select
          value={adults}
          onChange={(e) => setAdults(Number(e.target.value))}
          className="w-full border border-stone-200 p-2.5 rounded bg-white focus:ring-1 focus:ring-orange-900 outline-none"
        >
          {adultOptions.map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? 'Adult' : 'Adults'}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 text-left min-w-[150px]">
        <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
          Children (Under 18 years)
        </label>
        <select
          value={children}
          onChange={(e) => setChildren(Number(e.target.value))}
          className="w-full border border-stone-200 p-2.5 rounded bg-white focus:ring-1 focus:ring-orange-900 outline-none"
        >
          {childrenOptions.map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? 'Child' : 'Children'}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SearchTotalGuestField;
