import SearchDateField from './SearchDateField.tsx';
import SearchTotalGuestField from './SearchTotalGuestField.tsx';

const SearchBar = ({
  checkInDate,
  checkOutDate,
  onCheckInDateChange,
  onCheckOutDateChange,
  adults,
  children,
  onAdultsChange,
  onChildrenChange,
  onSearch,
}: {
  checkInDate: string;
  checkOutDate: string;
  onCheckInDateChange: (checkInDate: string) => void;
  onCheckOutDateChange: (checkOutDate: string) => void;
  adults: number;
  children: number;
  onAdultsChange: (adults: number) => void;
  onChildrenChange: (children: number) => void;
  onSearch: () => void;
}) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-2xl flex flex-wrap md:flex-nowrap gap-4 items-end max-w-5xl mx-auto text-stone-800">
      <SearchDateField
        label={'Check-in'}
        value={checkInDate}
        onChange={onCheckInDateChange}
      />
      <SearchDateField
        label={'Check-out'}
        value={checkOutDate}
        onChange={onCheckOutDateChange}
      />
      <SearchTotalGuestField
        adults={adults}
        onAdultsChange={onAdultsChange}
        children={children}
        onChildrenChange={onChildrenChange}
      />
      <button
        onClick={onSearch}
        className="w-full md:w-auto bg-orange-600 text-white px-10 py-2.5 rounded font-bold hover:bg-orange-700 transition uppercase text-sm tracking-widest"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
