import SearchIcon from './icons/SearchIcon';

function SearchHeader({ searchClickHandler, setSearch, search, width }) {
  if (width <= 1024) return null;

  return (
    <div className='w-full border-green-300 border-solid relative'>
      <input
        value={search}                     // اضافه کردن مقدار کنترل‌شده
        onChange={(e) => setSearch(e.target.value)}
        className='w-full border rounded-full p-3 pr-12 bg-bgcard text-white'
        type="text"
        placeholder="اهنگ مورد نظرتان را سرچ کنید"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <SearchIcon clickHandler={searchClickHandler} />
      </div>
    </div>
  );
}

export default SearchHeader;
