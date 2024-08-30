import styles from "../css modules/home.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/scrollbar";
import { IoIosArrowRoundForward } from "react-icons/io";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
// import { useInView } from "framer-motion";
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
import { LuIndianRupee } from "react-icons/lu";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Home() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [currentImg, setCurrentImg] = useState(
    "/images/home/Sofa-Home-1-Section-3-01.jpg"
  );
  const homeImgUrls = [
    "/images/home/3.jpg",
    "/images/home/2.jpg",
    "/images/home/1.jpg",
  ];

  // const [currentCollection] = useState([]);

  // const { ref, inView } = useInView({
  //   triggerOnce: true,
  //   threshold: 0.1,
  // });

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
      {/* Collection */}
      <div className="container lg:w-[1440px] mx-auto flex flex-col justify-center items-center my-10">
        <p className="text-[--mainColor]">EXPLORE OUR</p>
        <h2 className="text-2xl md:text-4xl lg:text-6xl text-white">
          Luxurious Haven Collection
        </h2>
        <div className="collectionsName my-8 flex justify-center items-center px-3">
          <ul className="flex justify-center items-center gap-4 text-white">
            <li className="border-b-[1px] cursor-pointer">Home Decoration</li>
            <li>Office Decoration</li>
            <li>Indoor Decoration</li>
            <li>Outdoor Decoration</li>
          </ul>
        </div>
        <div className="boxs grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto px-3">
          <div className="box">
            <div className="imgContainer relative hover:cursor-pointer hover:scale-105 transition-all duration-200">
              <img
                src="/images/home/shop-2-01.jpg"
                alt="collectionImg"
                className="rounded-lg"
              />
              <span className="absolute top-3 right-2 text-white bg-[--mainColor] p-1 text-xs rounded">
                ON SALE
              </span>
            </div>
            <div className="text-center">
              <p className="text-[#e2e1e1d0] my-2">HOME DECORSTION</p>
              <h2 className="text-white text-md md:text-xl lg:text-2xl font-semibold">
                Modern Ceramic Lamp
              </h2>
              <p className="flex justify-center items-center text-white my-2">
                <LuIndianRupee />
                51.70 - <LuIndianRupee /> 58.50
              </p>
            </div>
          </div>
          <div className="box">
            <div className="imgContainer relative hover:cursor-pointer hover:scale-105 transition-all duration-200">
              <img
                src="/images/home/shop-1-01.jpg"
                alt="collectionImg"
                className="rounded-lg"
              />
              <span className="absolute top-3 right-2 text-white bg-[--mainColor] p-1 text-xs rounded">
                ON SALE
              </span>
            </div>
            <div className="text-center">
              <p className="text-[#e2e1e1d0] my-2">HOME DECORSTION</p>
              <h2 className="text-white text-md md:text-xl lg:text-2xl font-semibold">
                Soft Seater Chair
              </h2>
              <p className="flex justify-center items-center text-white my-2">
                <LuIndianRupee />
                108.95 - <LuIndianRupee /> 123.50
              </p>
            </div>
          </div>
          <div className="box">
            <div className="imgContainer relative hover:cursor-pointer hover:scale-105 transition-all duration-200">
              <img
                src="/images/home/shop-7-01.jpg"
                alt="collectionImg"
                className="rounded-lg"
              />
              <span className="absolute top-3 right-2 text-white bg-[--mainColor] p-1 text-xs rounded">
                ON SALE
              </span>
            </div>
            <div className="text-center">
              <p className="text-[#e2e1e1d0] my-2">HOME DECORSTION</p>
              <h2 className="text-white text-md md:text-xl lg:text-2xl font-semibold">
                Elegant Wooden Table
              </h2>
              <p className="flex justify-center items-center text-white my-2">
                <LuIndianRupee />
                88.20 - <LuIndianRupee /> 146.40
              </p>
            </div>
          </div>
          <div className="box">
            <div className="imgContainer relative hover:cursor-pointer hover:scale-105 transition-all duration-200">
              <img
                src="/images/home/shop-4-01.jpg"
                alt="collectionImg"
                className="rounded-lg"
              />
              <span className="absolute top-3 right-2 text-white bg-[--mainColor] p-1 text-xs rounded">
                ON SALE
              </span>
            </div>
            <div className="text-center">
              <p className="text-[#e2e1e1d0] my-2">HOME DECORSTION</p>
              <h2 className="text-white text-md md:text-xl lg:text-2xl font-semibold">
                Round Wood Table
              </h2>
              <p className="flex justify-center items-center text-white my-2">
                <LuIndianRupee />
                119.10 - <LuIndianRupee /> 123.75
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Collection */}
      {/* accordian */}
      <div className="container lg:w-[1440px] flex justify-center items-center mx-auto gap-4 my-10 flex-col lg:flex-row">
        <div className="flex-1 px-3">
          <p className="text-[--mainColor]">Product related queries</p>
          <h2 className="text-2xl md:text-3xl lg:text-6xl text-white my-5">
            Products & Service
          </h2>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            className="border-b-[1px] border-[#5a5a5a] mb-5"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="text-red-500" />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={{ background: "black" }}
            >
              <Typography
                sx={{ color: "white" }}
                className="hover:text-[--mainColor]"
              >
                For furniture purchases, do you have financing options?
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ background: "black" }}>
              <Typography className="text-[#dddcdccc] max-w-[80%]">
                Pain should be followed by coaching. Elit duis sad sollicitudin
                nibh is important. Utrice eros in the course of the high school.
                Ultricies sad no aquet for the tortor at the auctor urn now.
                Consectetur adipiscing elit duis trisque sollicitudin nibh sit
                amet.{" "}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
            className="border-b-[1px] border-[#5a5a5a] mb-5"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={{ background: "black" }}
            >
              <Typography
                sx={{ color: "white" }}
                className="hover:text-[--mainColor]"
              >
                Do you have eco-friendly furniture?
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ background: "black" }}>
              <Typography className="text-[#dddcdccc] max-w-[80%]">
                I need the wisdom of God. What a caricature of a doctor who
                hates football. Everyone needs to drink and not need to do their
                homework. It's a great airline for kids. Aliquet lectus proin
                nibh nisl condimentum id. Ridiculous mus mauris vitae ultricies
                leo integer.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
            className="border-b-[1px] border-[#5a5a5a] mb-5"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={{ background: "black" }}
            >
              <Typography
                sx={{ color: "white" }}
                className="hover:text-[--mainColor]"
              >
                Is it possible to follow the delivery of my furniture?
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ background: "black" }}>
              <Typography className="text-[#dddcdccc] max-w-[80%]">
                The yeast of the god's throat in the ornament than the cartoon
                of the doctor with football arrows. I want to decorate the bed.
                Morbi, the urn of the employee, but the element of football is
                easy. Everyone doesn't want to drink or do their homework. I
                don't hate euismod lacinia at quis risus sed vulputate odio.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
            className="border-b-[1px] border-[#5a5a5a] mb-5"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={{ background: "black" }}
            >
              <Typography
                sx={{ color: "white" }}
                className="hover:text-[--mainColor]"
              >
                Do you offer design consultations?
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ background: "black" }}>
              <Typography className="text-[#dddcdccc] max-w-[80%]">
                For the pure does not present an element that is easy or
                natural. Pharetra diam should be a lot of fans. The mountains,
                pregnant with their partners and born, will give birth to
                feathers and great thrusts. The price of the product itself is
                insignificant, or the price of the bed that adorns the pure
                palate.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel5"}
            onChange={handleChange("panel5")}
            className="border-b-[1px] border-[#5a5a5a] mb-5"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={{ background: "black" }}
            >
              <Typography
                sx={{ color: "white" }}
                className="hover:text-[--mainColor]"
              >
                Are custom orders accepted for furniture that isn't in stock?
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ background: "black" }}>
              <Typography className="text-[#dddcdccc] max-w-[80%]">
                It is said that everyone who lived in this street is free from
                arrows. It is said that it is sad and urgent that someone
                himself suspended the basketball. Ultricies lake but ugly
                tincidunt id aquiet risus feugiat. Maecenas was flattered by
                some of the chocolates he wanted.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="imgContainer flex-1 px-3">
          <img src="/images/home/Home-1-Section-5-3.jpg" alt="" />
        </div>
      </div>
      {/* accordian */}
      {/* blog */}
      <div className="container lg:w-[1440px] mx-auto my-10">
        <p className="text-[--mainColor]">Get the Latest News</p>
        <h2 className="text-2xl md:text-3xl lg:text-6xl text-white my-5">
          Visit Our Blog
        </h2>
        <div className="flex justify-center items-center gap-5 flex-col lg:flex-row">
          <div className="right flex-1">
            <div className="imgCotainer">
              <img src="" alt="" />
            </div>
          </div>
          <div className="left flex-1"></div>
        </div>
      </div>
      {/* blog */}
    </div>
  );
}

export default Home;
