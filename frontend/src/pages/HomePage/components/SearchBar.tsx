import { useState } from 'react';
import SearchDateField from './SearchDateField.tsx';
import SearchTotalGuestField from './SearchTotalGuestField.tsx';

const SearchBar = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  return (
    <div className="bg-white p-5 rounded-xl shadow-2xl flex flex-wrap md:flex-nowrap gap-4 items-end max-w-5xl mx-auto text-stone-800">
      <SearchDateField
        label={'Check-in'}
        value={checkInDate}
        onChange={setCheckInDate}
      />
      <SearchDateField
        label={'Check-out'}
        value={checkOutDate}
        onChange={setCheckOutDate}
      />
      <SearchTotalGuestField />
      <button className="w-full md:w-auto bg-orange-600 text-white px-10 py-2.5 rounded font-bold hover:bg-orange-700 transition uppercase text-sm tracking-widest">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
