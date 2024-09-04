import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faShoppingCart, faHeart } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch wishlist from API
    axios.get('http://localhost:5000/api/v1/fur/favorites')
      .then(response => {
        setWishlist(response.data);
      })
      .catch(error => {
        console.error("Error fetching wishlist:", error);
      });
  }, []);

  const handleRemove = (id) => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to remove this item?</p>
          <div>
            <button
              className="btn btn-danger"
              onClick={() => {
                axios.delete(`http://localhost:5000/api/v1/fur/favorites/${id}`)
                  .then(() => {
                    setWishlist(wishlist.filter((item) => item._id !== id));
                    toast.success("Item removed from wishlist!", {
                      position: "top-center",
                      autoClose: 3000,
                    });
                    closeToast();
                  })
                  .catch(error => {
                    toast.error("Error removing item from wishlist.");
                    console.error(error);
                  });
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

  const addToCart = (id) => {
    axios.patch(`http://localhost:5000/api/v1/fur/users/add/${id}`)
      .then(() => {
        toast.success("Item added to cart!", {
          position: "top-center",
          autoClose: 3000,
        });
      })
      .catch(error => {
        toast.error("Error adding item to cart.");
        console.error(error);
      });
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
              <Link to="/">
                <button className="bg-[--mainColor] text-white px-6 py-3 rounded-md hover:bg-orange-600 transition duration-300 border-2 border-[--mainColor]">
                  Return To Shop
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlist.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md cursor-pointer"
                    onClick={() => navigate(`/product-details/${item._id}`)}
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg md:text-xl font-semibold mb-2">{item.name}</h3>
                    <p className="text-[#dfddddd2] mb-2">{item.price} $</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="bg-[--mainColor] text-white px-3 py-2 rounded-md hover:bg-orange-600 transition duration-300 border border-[--mainColor]"
                      onClick={() => addToCart(item._id)}
                    >
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition duration-300 border border-red-600"
                      onClick={() => handleRemove(item._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
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
