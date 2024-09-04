import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../apis/axiosConfig.js";

function Cart() {
  const [price, setPrice] = useState(0);
  let [quantity, setQuantity] = useState(1);
  let [subTotal, setSubTotal] = useState(price);
  let [coupon, setCoupon] = useState();
  let [total, setTotal] = useState(price);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/getCartPrducts");
        setProducts(response.data);
        console.log(products);
        // setQuantity(products[0].quantity);
        // console.log(quantity);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleQuantity = (e) => {
    if (e.target.id === "decrease") {
      if (quantity !== 1) {
        setQuantity(--quantity);
        setSubTotal((subTotal -= price));
        setTotal(subTotal);
      }
    }
    if (e.target.id === "increase") {
      setQuantity(++quantity);
      setSubTotal((subTotal += price));
      setTotal(subTotal);
    }
  };

  const handleCoupon = (e) => {
    setCoupon(e.target.value);
  };
  const handleSubmitCoupon = (e) => {
    e.preventDefault();
    switch (coupon) {
      case "ahmed12":
        return setTotal(total - 100);
      default:
        return setTotal(total - 0);
    }
  };

  const handleRemoveProduct = async (productId) => {
    console.log(productId);
    try {
      const removeProduct = await axiosInstance.delete(
        `/removeFromCart/${productId}`
      );

      if (removeProduct) {
        console.log("done");
        setProducts(
          products.filter((product) => product.productId._id !== productId)
        );
        console.log("removed Product");
        console.log(products);
      } else {
        console.log("Failed to remove the product");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* section header */}
      <section className="bg-slate-600 py-44">
        <div className="m-auto w-fit">
          <h3 className="text-5xl text-white">Cart</h3>
          <div className="text-center my-4">
            <Link href="">
              <span className="text-white hover:text-orange-500 duration-500">
                Home
              </span>
            </Link>
            <span className="text-[#A5A5A5]"> / </span>
            <span className="text-[#A5A5A5]">Cart</span>
          </div>
        </div>
      </section>

      <section className="bg-[#161615] py-16 px-10">
        {/* section products empty */}
        <div className={`${products && "hidden"}`}>
          <div className="bg-[#2B2B2B] text-center md:text-start rounded-br-xl rounded-bl-xl relative">
            <span className="absolute bg-[#019ED5] w-full h-[3px] block"></span>
            <div className="p-6 text-white font-bold">
              Your cart is currently empty.
            </div>
          </div>
          <button className="mt-10 px-6 py-3 text-[#C26510] border border-[#C26510] rounded-3xl hover:text-white hover:bg-[#C26510] duration-500">
            Return To Shop
          </button>
        </div>

        {/* section products cart */}
        <div className={`${!products && "hidden"}`}>
          <div className="bg-[#2B2B2B] text-center md:text-start rounded-br-xl rounded-bl-xl relative">
            <span className="absolute bg-[#019ED5] w-full h-[3px] block"></span>
            <div className="p-6 text-white font-bold">
              Got a gift card from a loved one?{" "}
              <Link
                to={""}
                className="hover:text-[#C26510] duration-500 underline"
              >
                Use it here!
              </Link>
            </div>
          </div>

          {/* products */}
          <div className="mt-10 mb-5 py-5 border border-[#393938] md:border-[#C26510] rounded-2xl">
            <ul className="px-7 hidden md:grid grid-cols-10 items-center text-white">
              <li className="col-span-4">Product</li>
              <li className="col-span-2">Price</li>
              <li className="col-span-2">Quantity</li>
              <li className="col-span-2">SubTotal</li>
            </ul>
            <span className="my-6 bg-[#393938] w-full h-[2px] hidden md:block"></span>
            {products &&
              products.map((product) => (
                <ul
                  key={product}
                  className="md:relative px-7 grid grid-cols-10 items-center"
                >
                  <li className="col-span-full md:col-span-4 flex flex-col md:flex-row items-center gap-0 md:gap-6">
                    <figure className="relative md:static w-full md:w-24">
                      <img
                        className="w-full rounded-lg"
                        src={`${product.productId.images[0]}`}
                        alt=""
                      />
                      <li
                        onClick={() =>
                          handleRemoveProduct(product.productId.id)
                        }
                        className="absolute text-center w-[26px] h-[26px] rounded-[50%] bg-[#C26510] hover:bg-[#9F2124] hover:cursor-pointer duration-500 top-5 right-5 md:top-1/2 md:-translate-y-1/2 md:right-12 text-white"
                      >
                        <FontAwesomeIcon icon={faX} />{" "}
                      </li>
                    </figure>
                    <div className="mt-5 md:mt-0 text-center md:text-start">
                      <p className="text-xl md:text-base text-white hover:text-[#C26510] duration-500">
                        {product.productId.name}
                      </p>
                      <span className="mt-3 block text-[#999999]">
                        Color: <span>Blue</span>
                      </span>
                    </div>
                  </li>
                  <li className="col-span-5 md:col-span-2 text-center md:text-start text-white">
                    EGP {product.productId.price}
                  </li>
                  <li className="col-span-5 md:col-span-2 text-center md:text-start ml-auto mr-auto mt-6 md:m-0">
                    <div className="p-3 w-fit flex gap-3 rounded-3xl border border-[#C26510]">
                      <span
                        id="decrease"
                        value="increase"
                        onClick={(e) => handleQuantity(e)}
                        className="text-[#C26510] cursor-pointer"
                      >
                        -
                      </span>
                      <span className="text-white">{quantity}</span>
                      <span
                        id="increase"
                        onClick={(e) => handleQuantity(e)}
                        className="text-[#C26510] cursor-pointer"
                      >
                        +
                      </span>
                    </div>
                  </li>
                  <li className="col-span-full my-5 block md:hidden h-[1px] bg-[#C26510]"></li>
                  <li className="col-span-5 md:col-span-2 text-center md:text-start top-1/2 md:top-0 translate-x-1/2 md:translate-x-0 text-white">
                    EGP {subTotal}
                  </li>
                </ul>
              ))}
          </div>
          <div className="text-center md:text-end">
            <button className="px-6 py-3 text-[#C26510] border border-[#C26510] rounded-3xl hover:text-white hover:bg-[#C26510] duration-500">
              Update Cart
            </button>
          </div>

          {/* coupon */}
          <div className="mt-14 p-12 border border-[#5E5E5E] rounded-2xl">
            <div className="text-center md:text-start text-white text-2xl font-bold mb-4">
              Coupon:
            </div>
            <form
              onSubmit={(e) => handleSubmitCoupon(e)}
              className="flex flex-col md:flex-row"
            >
              <input
                type="text"
                name="coupon"
                value={coupon}
                onChange={(e) => handleCoupon(e)}
                placeholder="Coupon code"
                className="text-center md:text-start w-full md:w-3/4 text-[#5E5E5E] mr-3 py-3 px-6 bg-transparent border border-[#5E5E5E] rounded-3xl"
              />
              <button className="mt-5 w-full md:mt-0 md:w-fit px-6 py-3 text-[#C26510] border border-[#C26510] rounded-3xl hover:text-white hover:bg-[#C26510] duration-500">
                Apply Coupon
              </button>
            </form>
          </div>

          {/* cart totals */}
          <div className="text-center md:text-start mt-14 mb-14 px-12 py-10 border border-[#5E5E5E] rounded-2xl">
            <div>
              <h3 className="mb-5 text-2xl text-white">Cart Totals</h3>
              <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:justify-between">
                <span className="text-white">Subtotal</span>
                <span className="text-white">EGP {subTotal}</span>
              </div>
              <span className="my-4 bg-[#5E5E5E] w-full h-[1px] block"></span>
              <div>
                <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between">
                  <span className="text-white">Shipping</span>
                  <span className="text-white">Free Shipping</span>
                </div>
                <div className="md:text-end">
                  <div className="flex flex-col my-3">
                    <span className="text-white mb-1">Shipping to</span>
                    <span className="text-white font-bold">Tamil Nadu.</span>
                  </div>
                  <div>
                    <span className="text-white underline cursor-pointer hover:text-[#C26510] duration-500">
                      Change Address
                    </span>
                  </div>
                </div>
              </div>
              <span className="my-4 bg-[#5E5E5E] w-full h-[1px] block"></span>
              <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between text-white">
                <span>Total</span>
                <span>EGP {total}</span>
              </div>
              <span className="my-4 bg-[#5E5E5E] w-full h-[1px] block"></span>
              <button className="w-full md:w-fit mt-5 px-6 py-3 text-[#C26510] border border-[#C26510] rounded-3xl hover:text-white hover:bg-[#C26510] duration-500">
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cart;
