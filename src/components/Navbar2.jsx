import { faCaretDown, faCartPlus, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Navbar2(){

  return(
    <div className="bg-slate-900 w-[1440px] m-auto flex items-center justify-between mt-10">
      <div className="text-white text-3xl">
        <Link to="/">Nestoria</Link>
      </div>
      <ul className="flex justify-between gap-12">
        <li className="text-white">
          <Link to="/">HOME</Link>
        </li>
        <li className="text-white">
          <Link to="">PAGES</Link>
        </li>
        <li className="text-white">
          <Link href="">SHOP</Link>
        </li>
        <li className="text-white">
          <Link href="">COLLECTION</Link>
        </li>
        <li className="text-white">
          <Link href="">BLOG</Link>
        </li>
        <li className="text-white">
          <Link to={"/contactus"}>CONTACT US</Link>
        </li>
      </ul>
      <div>
        <ul className="flex gap-5">
          <FontAwesomeIcon className="text-2xl text-white" icon={faMagnifyingGlass} />
          <FontAwesomeIcon className="text-2xl text-white" icon={faCartPlus} />
          <FontAwesomeIcon className="text-2xl text-white" icon={faCaretDown} />
        </ul>
      </div>
    </div>
  );
}

export default Navbar2;