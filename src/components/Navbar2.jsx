import {
  faCaretDown,
  faCartPlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import SearchContainer from "./searchContainer";

function Navbar2() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="bg-transparent absolute top-[48px] left-0 w-full mt-3 z-50">
      <div className="container mx-auto px-2 flex justify-between items-center w-full lg:w-[1440px]">
        <div className="text-white text-xl sm:text-2xl lg:text-3xl hover:text-[--mainColor] transition-all duration-150 font-serif">
          {/* <Link to="/">
            <img
              className="w-[230px]"
              src="https://res.cloudinary.com/delh2nrhf/image/upload/v1725672603/ajsz6xaqtvynhmnliwi3.png"
              alt=""
            />
          </Link> */}
          <Link to="/">Nestoria</Link>
        </div>
        <ul className="hidden lg:flex justify-between gap-4 lg:gap-12">
          <li className="text-white hover:text-[--mainColor] transition-all duration-150">
            <Link to="/">HOME</Link>
          </li>

          <li className="text-white hover:text-[--mainColor] transition-all duration-150">
            <Link to="/shop">SHOP</Link>
          </li>
          <li className="text-white hover:text-[--mainColor] transition-all duration-150">
            <Link to="/wishlist">WISHLIST</Link>
          </li>
          <li className="text-white hover:text-[--mainColor] transition-all duration-150">
            <Link to="/workshop">WORK SHOP</Link>
          </li>
          <li className="text-white hover:text-[--mainColor] transition-all duration-150">
            <Link to="/aboutus">ABOUT US</Link>
          </li>
          <li className="text-white hover:text-[--mainColor] transition-all duration-150">
            <Link to="/contactus">CONTACT US</Link>
          </li>
          <li className="text-white hover:text-[--mainColor] transition-all duration-150">
            <Link to="/register">REGISTER</Link>
          </li>
        </ul>
        <div className="flex gap-2 sm:gap-4 lg:gap-5">
          <FontAwesomeIcon
            onClick={() => {
              setShowSearch(true);
            }}
            className="cursor-pointer text-lg sm:text-xl lg:text-2xl text-white hover:text-[--mainColor] transition-all duration-200"
            icon={faMagnifyingGlass}
          />
          <Link to="/cart">
            <FontAwesomeIcon
              className="cursor-pointer text-lg sm:text-xl lg:text-2xl text-white hover:text-[--mainColor] transition-all duration-200"
              icon={faCartPlus}
            />
          </Link>
          <FontAwesomeIcon
            className="cursor-pointer text-lg sm:text-xl lg:text-2xl text-white hover:text-[--mainColor] transition-all duration-200"
            icon={faCaretDown}
          />
          {showSearch && <SearchContainer setShowSearch={setShowSearch} />}
        </div>
      </div>
    </div>
  );
}

export default Navbar2;
