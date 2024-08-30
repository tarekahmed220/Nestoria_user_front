import { faAt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black py-8 flex flex-col lg:flex-row justify-between w-full lg:w-[1440px] m-auto px-4">
      <div className="w-full lg:w-[30%] mb-8 lg:mb-0">
        <h2 className="text-white text-2xl lg:text-3xl">Nestoria</h2>
        <p className="text-white text-lg lg:text-xl my-5">
          Proin a interdum elit. Etiam eu sapien sem. Suspendisse a massa justo.
          Cras eget lorem nunc. Fusce nec urna tempus tempus
        </p>
        <div className="flex gap-4">
          <FontAwesomeIcon className="text-white text-xl" icon={faAt} />
          <FaInstagram className="text-white text-xl" />
          <FaFacebookF className="text-white text-xl" />
          <FaYoutube className="text-white text-xl"></FaYoutube>
          <FaTwitter className="text-white text-xl"></FaTwitter>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 w-full lg:w-[40%] mb-8 lg:mb-0">
        <div className="text-white flex flex-col">
          <h4 className="text-lg lg:text-xl mb-4">Useful links</h4>
          <Link className="my-1 hover:text-orange-500 duration-500" to={"/"}>
            History
          </Link>
          <Link className="my-1 hover:text-orange-500 duration-500" to={"/"}>
            Our Team
          </Link>
          <Link className="my-1 hover:text-orange-500 duration-500">
            Privacy Policy
          </Link>
          <Link className="my-1 hover:text-orange-500 duration-500">
            Services Offered
          </Link>
          <Link className="hover:text-orange-500 duration-500">
            Product Catalog
          </Link>
        </div>

        <div className="text-white flex flex-col">
          <h4 className="text-lg lg:text-xl mb-4">Information</h4>
          <Link className="my-2 hover:text-orange-500 duration-500">
            FAQ/Return
          </Link>
          <Link className="my-1 hover:text-orange-500 duration-500">
            Privacy/Terms
          </Link>
          <Link className="my-1 hover:text-orange-500 duration-500">
            Affiliate
          </Link>
          <Link className="my-1 hover:text-orange-500 duration-500">
            Sizing Guide
          </Link>
          <Link className="my-1 hover:text-orange-500 duration-500">
            Accessibility
          </Link>
        </div>

        <div className="text-white flex flex-col">
          <h4 className="text-lg lg:text-xl mb-4">Support</h4>
          <Link className="my-1 hover:text-orange-500 duration-500">
            Your Account
          </Link>
          <Link className="my-1 hover:text-orange-500 duration-500">
            Press Release
          </Link>
          <Link className="my-1 hover:text-orange-500 duration-500">
            Return Centre
          </Link>
          <Link className="my-1 hover:text-orange-500 duration-500">
            App Download
          </Link>
          <Link className="my-1 hover:text-orange-500 duration-500">
            Advertisements
          </Link>
        </div>
      </div>

      <div className="w-full lg:w-auto">
        <h4 className="text-lg lg:text-xl">Follow @Instagram</h4>
      </div>
    </footer>
  );
}

export default Footer;
