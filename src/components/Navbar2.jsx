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
          <Link to="/">Nestoria</Link>
        </div>
        <ul className="hidden lg:flex justify-between gap-4 lg:gap-12">
          <li className="text-white hover:text-[--mainColor] transition-all duration-150">
            <Link to="/">HOME</Link>
          </li>
          <li className="text-white hover:text-[--mainColor] transition-all duration-150">
            <Link to="">PAGES</Link>
          </li>
          <li className="text-white hover:text-[--mainColor] transition-all duration-150">
            <Link to="/shop">SHOP</Link>
          </li>
          <li className="text-white hover:text-[--mainColor] transition-all duration-150">
            <Link to="/wishlist">WISHLIST</Link>
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
            className="cursor-pointer text-lg sm:text-xl lg:text-2xl text-white hover:text-[--mainColor] transition-all duration-200"
            icon={faMagnifyingGlass}
          />
          <FontAwesomeIcon
            className="cursor-pointer text-lg sm:text-xl lg:text-2xl text-white hover:text-[--mainColor] transition-all duration-200"
            icon={faCartPlus}
          />
          <FontAwesomeIcon
            className="cursor-pointer text-lg sm:text-xl lg:text-2xl text-white hover:text-[--mainColor] transition-all duration-200"
            icon={faCaretDown}
          />
          {showSearch && <SearchContainer />}
        </div>
      </div>
    </div>
  );
}

export default Navbar2;
