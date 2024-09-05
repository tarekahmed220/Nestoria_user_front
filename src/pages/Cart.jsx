import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../apis/axiosConfig.js";

function Cart() {
  // const [price, setPrice] = useState(0);
  let [subTotal, setSubTotal] = useState(0);
  let [coupon, setCoupon] = useState();
  let [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [isUsedCupon, setIsUsedCoupon] = useState(false);
  const [productColor, setProductColor] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/getCartPrducts");
        const productsWithSubTotal = response.data.map((product) => ({
          ...product,
          subTotal: product.quantity * product.productId.price,
        }));
        setProducts(productsWithSubTotal);
        // setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let subTotal = products.reduce(
      (acc, product) => acc + product.quantity * product.productId.price,
      0
    );
    setSubTotal(subTotal);
    setTotal(subTotal);
  }, [products]);

  // const handleQuantity = (e,productId) => {
  //   console.log(productId);
  //   if (e.target.id === "decrease") {
  //     if (quantity !== 1) {
  //       setQuantity(--quantity);
  //       setSubTotal((subTotal -= price));
  //       setTotal(subTotal);
  //     }
  //   }
  //   if (e.target.id === "increase") {
  //     setQuantity(++quantity);
  //     setSubTotal((subTotal += price));
  //     setTotal(subTotal);
  //   }
  // };

  const updateCart = async (quantity, productId, color) => {
    try {
      const response = await axiosInstance.put("/updateCart", {
        quantity,
        productId,
        color,
      });
      console.log("cart updated");
    } catch (err) {
      console.log(err);
    }
  };

  const handleToUpdateQuantity = (newQuantity, productId, color) => {
    if (newQuantity && productId && color) {
      updateCart(newQuantity, productId, color);
    } else {
      console.log("fail data");
    }
  };

  // const handleQuantityChange = (action, product) => {
  //   let newQuantity = product.quantity;
  //   if (action === "increase") {
  //     newQuantity += 1;
  //     setSubTotal(subTotal += product.productId.price);
  //     setTotal(subTotal);
  //   } else if (action === "decrease" && newQuantity > 1) {
  //     newQuantity -= 1;
  //     setSubTotal(subTotal -= product.productId.price);
  //     setTotal(subTotal);
  //   }
  //   if (newQuantity !== product.quantity) {
  //     handleToUpdateQuantity(newQuantity, product.productId._id);
  //     product.quantity = newQuantity;
  //     setProducts([...products]);
  //   }
  // };

  const handleQuantityChange = (action, product) => {
    let newQuantity = product.quantity;

    if (action === "increase") {
      newQuantity += 1;
    } else if (action === "decrease" && newQuantity > 1) {
      newQuantity -= 1;
    }

    if (newQuantity !== product.quantity) {
      handleToUpdateQuantity(newQuantity, product.productId._id, product.color);
      const updatedProduct = {
        ...product,
        quantity: newQuantity,
        subTotal: newQuantity * product.productId.price,
      };
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.productId._id === product.productId._id && p.color === product.color
            ? updatedProduct
            : p
        )
      );
    }
  };

  const handleCoupon = (e) => {
    setCoupon(e.target.value);
  };
  const handleSubmitCoupon = (e) => {
    e.preventDefault();
    if (isUsedCupon) {
      return console.log("not allow");
    }
    switch (coupon) {
      case "A12H34":
        setTotal(total - 500);
        break;
      case "1234":
        setTotal(total - 100);
        break;
      case "5678":
        setTotal(total - 200);
        break;
      default:
        setTotal(total);
        break;
    }
    setIsUsedCoupon(true);
  };

  const handleRemoveProduct = async (productId) => {
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
        {/* section products empty */}
        <div className={`${products.length > 1 && "hidden"}`}>
          <div className="bg-[#2B2B2B] text-center md:text-start rounded-br-xl rounded-bl-xl relative">
            <span className="absolute bg-[#019ED5] w-full h-[3px] block"></span>
            <div className="p-6 text-white font-bold">
              Your cart is currently empty.
            </div>
          </div>
          <Link to="/shop">
            <button className="mt-10 px-6 py-3 text-[#C26510] border border-[#C26510] rounded-3xl hover:text-white hover:bg-[#C26510] duration-500">
              Return To Shop
            </button>
          </Link>
        </div>

        {/* section products cart */}
        <div className={`${products.length < 1 && "hidden"}`}>
          <div className="bg-[rgb(43,43,43)] text-center md:text-start rounded-br-xl rounded-bl-xl relative">
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
              products.map((product, index) => (
                <div key={`${product.productId._id} - ${index}`}>
                  <ul className="md:relative px-7 grid grid-cols-10 items-center">
                    <li className="col-span-full md:col-span-4 flex flex-col md:flex-row items-center gap-0 md:gap-6">
                      <figure className="relative md:static w-full h-[300px] md:h-[100px] md:w-24">
                        <img
                          className="w-full h-full rounded-lg"
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
                          Color: <span>{product.color}</span>
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
                          onClick={() =>
                            handleQuantityChange("decrease", product)
                          }
                          className="text-[#C26510] cursor-pointer"
                        >
                          -
                        </span>
                        <span className="text-white">{product.quantity}</span>
                        <span
                          id="increase"
                          onClick={() =>
                            handleQuantityChange("increase", product)
                          }
                          className="text-[#C26510] cursor-pointer"
                        >
                          +
                        </span>
                      </div>
                    </li>
                    <li className="col-span-full my-5 block md:hidden h-[1px] bg-[#C26510]"></li>
                    <li className="col-span-5 md:col-span-2 text-center md:text-start top-1/2 md:top-0 translate-x-1/2 md:translate-x-0 text-white">
                      EGP {product.subTotal}
                    </li>
                  </ul>
                  <span
                    className={`w-full h-[1px] my-5 bg-[#C26510] ${
                      index !== products.length - 1 && "block"
                    }`}
                  ></span>
                </div>
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
                className="text-center md:text-start w-full md:w-3/4 text-[#5E5E5E] mr-3 py-3 px-6 bg-transparent border border-[#5E5E5E] focus:outline-none focus:border-[#C26510] duration-500 rounded-3xl"
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
