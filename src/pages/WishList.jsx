import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faShoppingCart, faHeart } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "../apis/axiosConfig";
import "react-toastify/dist/ReactToastify.css";

function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  // Fetch wishlist from API on component mount
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/fur/favorites');
        setWishlist(response.data.data.favorites);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemove = (id) => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to remove this item?</p>
          <div>
            <button
              className="btn btn-danger"
              onClick={async () => {
                try {
                  await axiosInstance.delete(`/api/v1/fur/favorites/${id}`);
                  setWishlist(wishlist.filter((item) => item.product._id !== id));
                  toast.success("Item removed from wishlist!", {
                    position: "top-center",
                    autoClose: 3000,
                  });
                } catch (error) {
                  toast.error("Error removing item from wishlist.");
                  console.error(error);
                }
                closeToast();
              }}
              style={{ marginRight: "10px" }}
            >
              Yes
            </button>
            <button className="btn btn-secondary" onClick={closeToast}>
              No
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeButton: false,
        style: { display: "flex", flexDirection: "column", alignItems: "center" },
      }
    );
  };

  const addToCart = async (quantity, productId, color) => {
    try {
      await axiosInstance.post("/addToCart", { quantity, productId, color });
      toast.success("Product added to cart!", { position: "top-center", autoClose: 3000 });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <ToastContainer />
      {/* Section one */}
      <div className="relative text-center">
        <img
          src="/images/about/home-hotspot-img-1.jpg"
          alt="Background"
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="m-auto w-full max-w-4xl text-center text-white">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Wishlist</h3>
            <div className="text-center my-4">
              <Link to="/">
                <span className="text-white hover:text-orange-500 duration-500 text-base sm:text-lg md:text-xl lg:text-2xl">
                  Home
                </span>
              </Link>
              <span className="text-[#A5A5A5] mx-2"> / </span>
              <span className="text-[#A5A5A5] text-base sm:text-lg md:text-xl lg:text-2xl">
                Wishlist
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section Two */}
      <section className="py-16 bg-[#101010] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <FontAwesomeIcon
              icon={faHeart}
              className="text-5xl text-[--mainColor] border-2 border-[--mainColor] p-4 rounded-full"
            />
            <h2 className="text-xl md:text-2xl lg:text-4xl text-white">Your Wishlist</h2>
          </div>

          {wishlist.length === 0 ? (
            <div className="bg-gray-800 text-center py-16 px-8 rounded-lg mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold mb-6 text-white">Your Wishlist is currently empty</h2>
              <Link to="shop">
                <button className="bg-transparent text-[--mainColor] px-6 py-3 rounded-full hover:bg-[--mainColor] hover:text-white transition duration-300 border-2 border-[--mainColor]">
                  Return To Shop
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlist.map((item) => (
                <div
                  key={item.product._id}
                  className="bg-gray-800 p-6 rounded-lg shadow-md cursor-pointer"
                  onClick={() => navigate(`/product-details/${item.product._id}`)}
                >
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-center">{item.product.name}</h3>
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <div className="text-center">
                    <p className="text-[#dfddddd2] mb-4">{item.product.price} $</p>
                    <div className="flex space-x-2 justify-center">
                      <button
                        className="flex items-center bg-transparent text-[--mainColor] px-4 py-2 rounded-full hover:bg-[--mainColor] hover:text-white transition duration-300 border-2 border-[--mainColor] focus:outline-none"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent navigation on button click
                          handleRemove(item.product._id);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} className="mr-2" /> Remove
                      </button>
                      <button
                        className="flex items-center bg-transparent text-[--mainColor] px-4 py-2 rounded-full hover:bg-[--mainColor] hover:text-white transition duration-300 border-2 border-[--mainColor] focus:outline-none"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent navigation on button click
                          addToCart(item.product.quantity, item.product._id, item.product.details.color);
                        }}
                      >
                        <FontAwesomeIcon icon={faShoppingCart} className="mr-2" /> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default WishlistPage;
