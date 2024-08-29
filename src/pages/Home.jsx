import styles from "../css modules/home.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/scrollbar";
import { IoIosArrowRoundForward } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion, useInView } from "framer-motion";
import { GiCheckMark } from "react-icons/gi";
import { GiSofa } from "react-icons/gi";
import { GiBedLamp } from "react-icons/gi";
import { BiCabinet } from "react-icons/bi";
import { MdShelves } from "react-icons/md";
import { MdTableChart } from "react-icons/md";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { MdDinnerDining } from "react-icons/md";
import { useState } from "react";
import { GiKitchenScale } from "react-icons/gi";

function Home() {
  const [currentImg, setCurrentImg] = useState(
    "/images/home/Sofa-Home-1-Section-3-01.jpg"
  );
  const homeImgUrls = [
    "/images/home/3.jpg",
    "/images/home/2.jpg",
    "/images/home/1.jpg",
  ];
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sections = [
    {
      name: "Sofa",
      icon: <GiSofa />,
      img: "/images/home/Sofa-Home-1-Section-3-01.jpg",
    },
    {
      name: "Cabinet",
      icon: <BiCabinet />,
      img: "/images/home/Cabinet-Home-1-Section-3-02.jpg",
    },
    {
      name: "Shelving Units",
      icon: <MdShelves />,
      img: "/images/home/Shelving Units.jpg",
    },
    {
      name: "Tea Table",
      icon: <MdTableChart />,
      img: "/images/home/tea table.jpg",
    },
    {
      name: "Decors",
      icon: <GiBedLamp />,
      img: "/images/home/decors.jpg",
    },
    {
      name: "Office Table",
      icon: <HiBuildingOffice2 />,
      img: "/images/home/office table.jpg",
    },
    {
      name: "Kitchen Furniture",
      icon: <GiKitchenScale />,
      img: "/images/home/kitchenfurniture.jpg",
    },
    {
      name: "Storage Furniture",
      icon: <MdDinnerDining />,
      img: "/images/home/storage furniture.jpg",
    },
  ];
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, EffectFade, Autoplay]}
        effect="fade"
        slidesPerView={1}
        navigation
        autoplay={{ delay: 5000, disableOnInteraction: false }}
      >
        {homeImgUrls.map((url, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="sectionOne relative ">
                <div
                  className={`${styles.text} flex flex-col justify-center items-center absolute top-1/2 left-1/2 z-30`}
                >
                  <p className="text-[--mainColor]">SMART SOLUTION</p>
                  <h1 className="text-center text-lg md:text-3xl  lg:text-4xl xl:text-5xl 2xl:text-6xl my-2 md:my-3 lg:my-3 text-[#ffffffdc]">
                    Enjoy With Style & Comfort
                  </h1>
                  <p className="text-[#dddadaf5] hidden md:block text-center my-1 md:my-2 line-clamp-2 md:line-clamp-3 lg:line-clamp-5">
                    The price of the product is very low, or the price of the
                    book. Some like the ferry line from diam concern For the bed
                    of two valleys. But the price of the sauce is the price of
                    the bed how much does it matter to the pellentesque tortor
                  </p>
                  <button className="bg-[--mainColor] text-[white] py-1 lg:py-2 px-6 rounded-3xl text-sm md:text-lg lg:text-xl flex justify-center items-center gap-3">
                    Shop Now
                    <span className="bg-white rounded-full flex justify-center items-center  text-black">
                      <IoIosArrowRoundForward />
                    </span>
                  </button>
                </div>
                <img src={url} alt="homeImg" className="w-full h-full" />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
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
      {/* section three */}
      <div className={`${styles.sectionThree} bg-black relative`}>
        <div className="relative">
          <img
            src={currentImg}
            alt="currentImg"
            className="w-full h-auto transition-opacity duration-500 ease-in-out"
          />
          <div className="absolute inset-0 bg-black opacity-40 z-10" />
          <div className="sectionsWithIcons absolute inset-0 flex items-center justify-center transition-all duration-200 z-20">
            <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-6 transition-all duration-200 px-3">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="link text-center flex items-center cursor-pointer justify-center transition-all duration-200 hover:scale-105"
                  onMouseEnter={() => setCurrentImg(section.img)}
                  onMouseLeave={() => setCurrentImg(currentImg)}
                >
                  <span className="text-white opacity-[0.7] text-xs md:text-xl lg:text-2xl 2xl:text-5xl hover:opacity-[1] font-bold transition-colors z-30">
                    {section.name}
                  </span>
                  <span className="ml-2 text-[--mainColor] text-xl md:text-3xl transition-colors z-30">
                    {section.icon}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* section three */}
    </div>
  );
}

export default Home;
