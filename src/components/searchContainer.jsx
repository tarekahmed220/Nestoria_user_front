import { IoIosSearch } from "react-icons/io";

function SearchContainer() {
  return (
    <div>
      <div className=" bg-[#101010] w-full h-[400px] mx-auto absolute top-0 left-0">
        <div className="relative">
          <input type="text" placeholder="Enter Keyword" />

          <IoIosSearch className="absolute" />
        </div>
      </div>
    </div>
  );
}

export default SearchContainer;
