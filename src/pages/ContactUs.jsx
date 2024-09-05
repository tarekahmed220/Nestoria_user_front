import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faCommentSms,
  faEnvelopeOpenText,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function ContactUs() {
  return (
    <div>
      {/* section header */}
      <section className="relative flex w-full h-[300px] md:h-[450px]">
        <div
          style={{
            backgroundImage: "url('/home-hotspot-img-1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
            opacity: "0.45",
          }}
          className="absolute top-0 left-0 w-full h-full"
        ></div>
        <div className="relative m-auto w-fit">
          <h3 className="text-5xl text-white">Contact Us</h3>
          <div className="text-center my-4">
            <Link href="">
              <span className="text-white hover:text-orange-500 duration-500">
                Home
              </span>
            </Link>
            <span className="text-[#A5A5A5]"> / </span>
            <span className="text-[#A5A5A5]">Contact US</span>
          </div>
        </div>
      </section>

      {/* section drop up */}
      <section
        style={{
          backgroundImage: "url('/body-bg.png')",
          backgroundPosition: "left top",
          backgroundSize: "auto",
          backgroundRepeat: "repeat",
          backgroundAttachment: "scroll",
          backgroundColor: "#000000",
        }}
        className="text-center py-20 px-6 md:px-10"
      >
        <div className="lg:w-1/2 m-auto px-11">
          <p className="text-[#C5660E]">DROP US A LINE</p>
          <h2 className="text-white text-4xl md:text-6xl my-6">
            Round-the-clock Service
          </h2>
          <p className="text-[#9C9C9C] text-[17px] md:text-[15px] font-bold">
            Sed id semper risus in hendrerit gravida rutrum quisque. Vitae proin
            sagittis nisl Vel elit scelerisque mauris rhoncus mattis rhoncus
            urna.
          </p>
        </div>

        <div className="bg-[#101010] my-14 p-14 rounded-3xl w-full lg:w-2/3 mx-auto shadow-lg">
          <form>
            {/* Name and Mobile Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-[#101010] text-white py-4 px-8 rounded-3xl border border-[#5E5E5E] focus:outline-none focus:border-orange-500 duration-500"
              />
              <input
                type="text"
                placeholder="Mobile Number"
                className="w-full bg-[#101010] border border-[#5E5E5E] text-white py-4 px-8 rounded-3xl focus:outline-none focus:border-orange-500 duration-500"
              />
            </div>

            {/* Mail ID */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Mail ID"
                className="w-full bg-[#101010] border border-[#5E5E5E] my-3 text-white py-4 px-8 rounded-3xl focus:outline-none focus:border-orange-500 duration-500"
              />
            </div>

            {/* Additional Information */}
            <div className="mb-6">
              <textarea
                placeholder="Additional Information"
                rows="9"
                className="w-full bg-[#101010] border border-[#5E5E5E] my-3 text-white py-4 px-8 rounded-3xl focus:outline-none focus:border-orange-500 duration-500"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-orange-500 text-white text-[17px] py-3 px-8 rounded-3xl hover:bg-white hover:text-black duration-500"
              >
                Submit Query
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* section contact links */}
      <section
        style={{
          backgroundImage: "url('/body-bg.png')",
          backgroundPosition: "left top",
          backgroundSize: "auto",
          backgroundRepeat: "repeat",
          backgroundAttachment: "scroll",
          backgroundColor: "#101010",
        }}
        className="py-16 px-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
          <div className="content flex items-center gap-5">
            <div>
              <FontAwesomeIcon
                className="text-orange-500 text-7xl"
                icon={faClipboardList}
              />
            </div>
            <div>
              <a href="">
                <h4 className="text-2xl text-white hover:text-orange-500 duration-500">
                  Transit Protocol
                </h4>
              </a>
              <p className="text-[#9D9D9D]">
                Eget arcu dictum varius duis at lorem donec.
              </p>
            </div>
          </div>
          <div className="content flex items-center gap-5">
            <div>
              <FontAwesomeIcon
                className="text-orange-500 text-7xl"
                icon={faCommentSms}
              />
            </div>
            <div>
              <a href="">
                <h4 className="text-2xl text-white hover:text-orange-500 duration-500">
                  Chat Assistance
                </h4>
              </a>
              <p className="text-[#9D9D9D]">
                Tuam quisque id diam vel quam aecenas.
              </p>
            </div>
          </div>
          <div className="content flex items-center gap-5">
            <div>
              <FontAwesomeIcon
                className="text-orange-500 text-7xl"
                icon={faEnvelopeOpenText}
              />
            </div>
            <div>
              <a href="">
                <h4 className="text-2xl text-white hover:text-orange-500 duration-500">
                  Email Interaction
                </h4>
              </a>
              <p className="text-[#9D9D9D]">
                Quis varius quam id diam vel aecenas.
              </p>
            </div>
          </div>
          <div className="content flex items-center gap-5">
            <div>
              <FontAwesomeIcon
                className="text-orange-500 text-7xl"
                icon={faStore}
              />
            </div>
            <div>
              <a href="">
                <h4 className="text-2xl text-white hover:text-orange-500 duration-500">
                  Global Stores
                </h4>
              </a>
              <p className="text-[#9D9D9D]">
                Condimentum id venenatis a vitae sapien.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
