import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = ({
  searchInput,
  handleSearch,
  clearSearch,
}: {
  searchInput: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearSearch: () => void;
}) => {
  return (
    <div className="fixed top-[59px] flex h-[70px] w-full flex-col items-center justify-center bg-gray-50 px-2.5 md:relative md:top-[10px]">
      <section className="relative w-[90%]">
        {!searchInput && (
          <FontAwesomeIcon icon={faSearch} className="absolute left-1 top-[10px] text-zinc-500" />
        )}
        <input
          type="text"
          name="search"
          placeholder="Search"
          id="search"
          className="inline-flex h-9 w-full items-center justify-start gap-1.5 border-b-[1px] border-zinc-500 bg-white pl-6 text-base font-normal outline-none"
          value={searchInput}
          onChange={handleSearch}
        />
        {searchInput && (
          <FontAwesomeIcon
            icon={faTimes}
            className="absolute right-3 top-[10px] cursor-pointer text-zinc-500"
            onClick={clearSearch}
          />
        )}
      </section>
    </div>
  );
};

export default Search;
