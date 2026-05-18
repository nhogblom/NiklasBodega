import SearchDateField from './SearchDateField.tsx';
import { useState } from 'react';

const HomePageHero = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  return (
    <header className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2000"
        alt="Luxury Hotel"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
          Rustic Luxury. <br /> Timeless Comfort.
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
          Experience the warmth of the Mediterranean at Niklas Bodega.
        </p>

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
          <div className="flex-1 text-left min-w-[150px]">
            <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
              Guests
            </label>
            <select className="w-full border border-stone-200 p-2.5 rounded bg-white focus:ring-1 focus:ring-orange-900 outline-none">
              <option>2 Adults, 0 Children</option>
              <option>1 Adult</option>
            </select>
          </div>
          <button className="w-full md:w-auto bg-orange-600 text-white px-10 py-2.5 rounded font-bold hover:bg-orange-700 transition uppercase text-sm tracking-widest">
            Search
          </button>
        </div>
      </div>
    </header>
  );
};
export default HomePageHero;
