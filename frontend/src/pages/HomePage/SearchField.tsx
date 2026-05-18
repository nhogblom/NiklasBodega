const SearchField = ({
  label,
  inputPlaceholder,
}: {
  label: string;
  inputPlaceholder: string;
}) => {
  return (
    <div className="flex-1 text-left min-w-[150px]">
      <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1 ml-1">
        {label}
      </label>
      <input
        type="text"
        defaultValue={inputPlaceholder}
        className="w-full border border-stone-200 p-2.5 rounded focus:ring-1 focus:ring-orange-900 outline-none"
      />
    </div>
  );
};

export default SearchField;
