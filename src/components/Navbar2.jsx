import {
  faCaretDown,
  faCartPlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Navbar2() {
  return (
    <div className="bg-transparent w-full mx-auto flex items-center justify-between mt-10 px-4 lg:w-[1440px]">
      <div className="text-white text-2xl lg:text-3xl hover:text-[--mainColor] transition-all duration-150 ">
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
          <Link href="">SHOP</Link>
        </li>
        <li className="text-white hover:text-[--mainColor] transition-all duration-150">
          <Link href="">COLLECTION</Link>
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
      <div>
        <ul className="flex gap-4 lg:gap-5">
          <FontAwesomeIcon
            className="text-xl lg:text-2xl text-white hover:text-[--mainColor] transition-all duration-150"
            icon={faMagnifyingGlass}
          />
          <FontAwesomeIcon
            className="text-xl lg:text-2xl text-white hover:text-[--mainColor] transition-all duration-150"
            icon={faCartPlus}
          />
          <FontAwesomeIcon
            className="text-xl lg:text-2xl text-white hover:text-[--mainColor] transition-all duration-150"
            icon={faCaretDown}
          />
        </ul>
      </div>
    </div>
  );
}

export default Navbar2;
