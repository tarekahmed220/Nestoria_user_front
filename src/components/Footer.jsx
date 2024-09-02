import { faAt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
  return (
    // <footer>Footer</footer>
    <footer className="container mx-auto lg:w-[1440px] bg-black  pt-7">
      <div className="flex justify-between gap-2 lg:gap-5 pt-20 pb-16 px-3">
        <div className="flex-1">
          <Link
            to={"/"}
            className="text-white text-3xl hover:text-orange-500 duration-500"
          >
            Nestoria
          </Link>
          <p className="text-white text-xl my-5 line-clamp-3 lg:line-clamp-none mr-3">
            Proin a interdum elit. Etiam eu sapien sem. Suspendisse a massa
            justo. Cras eget lorem nunc. Fusce nec urna tempus tempus
          </p>
          <div className="flex gap-2 lg:gap-4 mx-2">
            <Link to={""}>
              <FontAwesomeIcon
                className="text-white text-xl hover:text-orange-500 duration-500"
                icon={faAt}
              />
            </Link>
            <Link to={""}>
              <FaInstagram className="text-white text-xl hover:text-orange-500 duration-500" />
            </Link>
            <Link to={""}>
              <FaFacebookF className="text-white text-xl hover:text-orange-500 duration-500" />
            </Link>
            <Link to={""}>
              <FaYoutube className="text-white text-xl hover:text-orange-500 duration-500"></FaYoutube>
            </Link>
            <Link to={""}>
              <FaX className="text-white text-xl hover:text-orange-500 duration-500"></FaX>
            </Link>
          </div>
        </div>
        <div className="flex gap-3 w-[40%]">
          <div className="text-white md:flex flex-col flex-1 hidden ">
            <h4 className="text-xl mb-4">Useful links</h4>
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

          <div className="text-white lg:flex flex-col hidden flex-1 ">
            <h4 className="text-xl mb-4">Information</h4>
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

          <div className="text-white flex flex-col mr-3 flex-1 ">
            <h4 className="text-xl mb-4">Support</h4>
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

        <div className="hidden lg:block ">
          <h4 className="text-xl text-white">Follow @Instagram</h4>
          <div className="imagesInsta grid grid-cols-3 gap-3 mt-7">
            <figure className="imagesInsta w-28 relative">
              <img
                className="imagesInsta rounded-lg"
                src="/images/home/Instagram-01.jpg"
                alt=""
              />
              <FaInstagram className="absolute hidden text-3xl text-white top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2"></FaInstagram>
            </figure>
            <figure className="w-28 relative">
              <img
                className="rounded-lg"
                src="/images/home/Instagram-02.jpg"
                alt=""
              />
              <FaInstagram className="absolute hidden text-3xl text-white top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2"></FaInstagram>
            </figure>
            <figure className="w-28 relative">
              <img
                className="rounded-lg"
                src="/images/home/Instagram-03.jpg"
                alt=""
              />
              <FaInstagram className="absolute hidden text-3xl text-white top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2"></FaInstagram>
            </figure>
            <figure className="w-28 relative">
              <img
                className="rounded-lg"
                src="/images/home/Instagram-04.jpg"
                alt=""
              />
              <FaInstagram className="absolute hidden text-3xl text-white top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2"></FaInstagram>
            </figure>
            <figure className="w-28 relative">
              <img
                className="rounded-lg"
                src="/images/home/Instagram-05.jpg"
                alt=""
              />
              <FaInstagram className="absolute hidden text-3xl text-white top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2"></FaInstagram>
            </figure>
            <figure className="w-28 relative">
              <img
                className="rounded-lg"
                src="/images/home/Instagram-06.jpg"
                alt=""
              />
              <FaInstagram className="absolute hidden text-3xl text-white top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2"></FaInstagram>
            </figure>
          </div>
        </div>
      </div>

      <span className="bg-[#2F2F2F] w-full h-[2px] text-[#2F2F2F] block"></span>

      <div className="my-2 flex justify-between items-center px-3">
        <div className="text-white">©TeaPoy site all rights Reserved</div>
        <div className="flex items-center gap-5 flex-wrap">
          <figure className="w-10">
            <img src="/images/home/master-card.png" alt="" />
          </figure>
          <figure className="w-10 text-white">
            <img src="/images/home/visa@4x.png" alt="" />
          </figure>
          <figure className="w-10">
            <img src="/images/home/Amex@4x.png" alt="" />
          </figure>
          <figure className="w-10">
            <img src="/images/home/apay@4x.png" alt="" />
          </figure>
          <figure className="w-10">
            <img src="/images/home/skrill@4x.png" alt="" />
          </figure>
          <figure className="w-10">
            <img src="/images/home/Paypal@4x.png" alt="" />
          </figure>
        </div>
      </div>

      <div className="w-full lg:w-auto">
        <h4 className="text-lg lg:text-xl">Follow @Instagram</h4>
      </div>
    </footer>
  );
}

export default Footer;
