import { GiCheckMark } from "react-icons/gi";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <div>
      {/* section header */}
      <section className="bg-slate-600 py-44">
        <div className="m-auto w-fit">
          <h3 className="text-5xl text-white">About Us</h3>
          <div className="text-center my-4">
            <Link to="/">
              <span className="text-white hover:text-orange-500 duration-500">
                Home
              </span>
            </Link>
            <span className="text-[#A5A5A5]"> / </span>
            <span className="text-[#A5A5A5]">About Us</span>
          </div>
        </div>
      </section>

      {/* section two */}
      <div className="homeHub flex flex-col md:flex-row  container lg:w-[1440px] mx-auto gap-4 py-20 my-[40px] px-[15px]">
        <div className="first flex-1">
          <p className="text-[--mainColor]">Home Decor Hub</p>
          <h2 className="text-xl md:text-2xl lg:text-4xl text-white">
            Exceptional Furniture's For Indoor & Outdoor
          </h2>
          <p className="my-4 line-clamp-4 text-[#dfddddd2] ">
            As eleifend mattis ligula, the door is loaded with urns at the
            borders. Aeneas vehicles do not belong to members of the arc. The
            whole protein and the price is flattering. The class is suitable for
            the silent partners who turn to the shores through our marriages,
            through the Hymenaean projects.
          </p>

          <img alt="example" src="/images/home/first.jpg" />
        </div>
        <div className="second flex-1">
          <img alt="example" src="/images/home/second.jpg" />

          <h2 className="text-xl md:text-2xl lg:text-4xl text-white mt-4">
            Discover Endless Designs
          </h2>
          <div className="my-6 line-clamp-4 text-[#dfddddd2] ">
            Integer dapibus ac dui pretium blandit. Class aptent taciti sociosqu
            ad litora torquent per conubia nostra, per inceptos himenaeos. Ut
            eleifend mattis ligula, porta finibus urna gravida at. Aenean
            vehicula sodales arcu non mattis.
            <div className="tip flex justify-start mt-2 items-center gap-2">
              <GiCheckMark className="text-[--mainColor]" />
              <span>
                But the eleifend of the estate, the gate of the border, the urn
                led at.
              </span>
            </div>
            <div className="tip flex justify-start mt-2 items-center gap-2">
              <GiCheckMark className="text-[--mainColor]" />
              <span>Ginteger proteins and dui are suitable for blanss.</span>
            </div>
            <div className="tip flex justify-start mt-2 items-center gap-2">
              <GiCheckMark className="text-[--mainColor]" />
              <span>Kenean vehicles are not owned by members of the arc.</span>
            </div>
          </div>
        </div>
      </div>
      {/* section two */}
    </div>
  );
}

export default AboutUs;
