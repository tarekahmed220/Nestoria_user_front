import { HeaderPages } from "../components/HeaderPages";
import { AccountDetails } from "../components/Profile components/AccountDetails";
import { Link } from "react-router-dom"; 

function Checkout() {
    return (
        <div>
            <HeaderPages namePage="Checkout" />
            
            <section
                style={{
                    backgroundImage: "url('/body-bg.png')",
                    backgroundPosition: "left top",
                    backgroundSize: "auto",
                    backgroundRepeat: "repeat",
                    backgroundAttachment: "scroll",
                    backgroundColor: "#101010",
                }}
                className="py-16 px-4 md:px-10"
            >
                {/* DIV 1 */}
                <div className="bg-[#2B2B2B] text-center md:text-start rounded-br-xl rounded-bl-xl relative mb-4">
                    <span className="absolute bg-[#019ED5] w-full h-[3px] block"></span>
                    <div className="p-6 text-white  flex justify-center md:justify-start items-center gap-2">
                        <span>Got a gift card from a loved one?</span>
                        <Link
                            to="#"
                            className="text-white hover:text-[--mainColor] transition-colors"
                            style={{ borderBottom: "2px solid white" }} 
                        >
                            Use it here!
                        </Link>
                    </div>
                </div>

                {/* DIV 2 */}
                <div className="bg-[#2B2B2B] text-center md:text-start rounded-br-xl rounded-bl-xl relative mb-4">
                    <span className="absolute bg-[#019ED5] w-full h-[3px] block"></span>
                    <div className="p-6 text-white flex justify-center md:justify-start items-center gap-2">
                        <span>Have a coupon?</span>
                        <Link
                            to="#"
                            className="text-white hover:text-[--mainColor] transition-colors"
                            style={{ borderBottom: "2px solid white" }} 
                        >
                            Click here to enter your code
                        </Link>
                    </div>
                </div>

                
                {/* <div className="text-center md:text-start mt-14 mb-14 px-12 py-10 border border-[#5E5E5E] rounded-2xl">
                  <AccountDetails />
                </div> */}
            
          
                
              {/* Your order */}
              <div className="text-center md:text-start mt-14 mb-14 px-12 py-10 border border-[#5E5E5E] rounded-2xl">
                <div>
                  <h3 className="mb-5 text-2xl text-white">Your order</h3>
                  <div className="mb-8"> 
                    <ul className="md:relative px-7 grid grid-cols-10 items-center">
                        <li className="col-span-full md:col-span-4 flex flex-col md:flex-row items-center gap-0 md:gap-6">
                            <figure className="relative md:static w-full h-[300px] md:h-[100px] md:w-24">
                                <img
                                    className="w-full h-full rounded-lg"
                                    src="images/home/shop-12-01.jpg"
                                    alt=""
                                />
                            </figure>
                            <div className="mt-5 md:mt-0 text-center md:text-start">
                                <p className="text-xl md:text-base text-white hover:text-[#C26510] duration-500">
                                    Adjustable single sofa
                                </p>
                                <span className="mt-3 block text-[#999999]">
                                    Color: <span>Orange</span>
                                </span>
                            </div>
                        </li>
                        
                        <li className="col-span-full my-5 block md:hidden h-[1px] bg-[#C26510]"></li>

                        {/* تعديل مكان السعر */}
                        <li className="col-span-full md:col-span-6 flex justify-between items-center text-white">
                            <span className="text-[#999999] text-sm"></span>
                            <span className="text-white">EGP 185.85</span>
                        </li>
                    </ul>
                  </div>
                  <span className="my-4 bg-[--mainColor] w-full h-[1px] block"></span>
                  <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:justify-between">
                    <span className="text-white">Subtotal</span>
                    <span className="text-white">EGP 185.85</span>
                  </div>
                  <span className="my-4 bg-[--mainColor] w-full h-[1px] block"></span>
                  
                  <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between">
                    <span className="text-white">Shipping</span>
                    <span className="text-white">Free Shipping</span>
                  </div>
                  <span className="my-4 bg-[--mainColor] w-full h-[1px] block"></span>
                  
                  <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between">
                    <span className="text-white">Total</span>
                    <span className= "text-white">EGP 185.85</span>
                  </div>
                  
                  <span className="mb-6 my-4 bg-[#5E5E5E] w-full h-[1px] block"></span>

                  <div className="mb-8 bg-[#2B2B2B] text-center md:text-start rounded-br-xl rounded-bl-xl relative">
                    <span className="absolute bg-[#019ED5] w-full h-[3px] block"></span>
                    <div className="p-8 text-white ">
                      sorry. it seems that there are no available payment methods.please contact us if you require assistance or
                      wish to make alternate arrangements.
                    </div>
                  </div>
                  <span className="my-4 bg-[#5E5E5E] w-full h-[1px] block"></span>

                  {/* تعديل حجم النص */}
                  <span className="mt-3 block text-[#999999] text-sm">
                    Your personal data will be used to process your order, support your experience throughout this website,
                    and for other purposes described in our
                    <Link
                        to="#"
                        className="text-white hover:text-[--mainColor] transition-colors ms-1"
                        style={{ borderBottom: "2px solid white" }}
                    >
                        privacy policy
                    </Link>
                  </span>
                  
                  <button className="w-full md:w-fit mt-5 px-6 py-3 text-[#C26510] border border-[#C26510] rounded-3xl hover:text-white hover:bg-[#C26510] duration-500">
                    Place order
                  </button>
                </div>
              </div>
            </section>
        </div>
    );
}

export default Checkout;
