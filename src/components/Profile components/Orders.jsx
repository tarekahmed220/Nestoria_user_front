import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../apis/axiosConfig";

export function Orders() {
  const [orders, setOrders] = useState("");
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = (
          await axiosInstance.get("/api/v1/fur/orders/getordersproducts")
        ).data;
        console.log(res);
        setOrders(res);
      } catch (err) {
        toast.error(err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      {!orders.length ? (
        <div className="bg-[#2B2B2B] text-center md:text-start rounded-br-xl rounded-bl-xl relative">
          <span className="absolute bg-[#019ED5] w-full h-[2px] block"></span>
          <div className="p-6 text-[#FBFBFB] flex justify-between">
            <span>No order has been made yet.</span>
            <Link to="/shop" className="underline hover:text-[#C26510]">
              Browse products
            </Link>
          </div>
        </div>
      ) : (
        <div>
          {/* products */}
          <div className="bg-transparent border border-[#C26510] rounded-lg p-6">
            {orders &&
              orders.map((order, index) => (
                <div key={`${order.userId} - ${index}`}>
                  {/* Order Header */}
                  <div className="flex justify-between items-center mb-4 text-white">
                    <div className="text-2xl font-semibold">
                      Order {order._id}
                    </div>
                    <div className="text-white text-xl font-semibold">
                      Total: {order.total} EGP
                    </div>
                  </div>
                  {order.products.map((product, index) => (
                    <div key={product.productId._id} className="bg-white rounded-lg shadow-lg p-6 mb-4">
                      <div className="grid grid-cols-12 gap-4 mb-2">
                        {/* Order Item Details */}
                        <div className="flex pb-4 mb-4 col-span-6">
                          <img
                            className="w-20 h-20 object-cover mr-6"
                            src={product.productId.images[0]}
                            alt="Product"
                          />
                          <div className="flex-1">
                            <div className="text-lg font-semibold pr-3">
                              {product.productId.name}
                            </div>
                            <div className="text-gray-500">{product.productId.price} EGP</div>
                            <div className="text-gray-500">Color: {product.color}</div>
                            <div className="text-gray-500">Quantity: {product.quantity}</div>
                          </div>
                        </div>

                        {/* Delivery and Shipping Info */}
                        <div className="col-span-3">
                          <div className="font-semibold mb-2">Shipping address</div>
                          <div>Floyd Miles</div>
                          <div>7363 Cynthia Pass</div>
                          <div>Toronto, ON N3Y 4H8</div>
                        </div>
                        <div className="col-span-3">
                          <div className="font-semibold mb-2">Shipping updates</div>
                          <div>f•••@example.com</div>
                          <div>1•••••••40</div>
                          <Link
                            href="#"
                            className="text-blue-500 hover:underline"
                          >
                            Edit
                          </Link>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="border-t pt-3">
                        <div className="text-gray-600 mb-2">
                          Preparing to ship on September 24, 2024
                        </div>
                        <div className="relative w-full bg-gray-200 h-2 rounded-full">
                          <div
                            className="absolute bg-blue-500 h-2 rounded-full"
                            style={{ width: product.deliveryStatus === "Processing" ? "35%" : product.deliveryStatus === "Shipped" ? "65%" : product.deliveryStatus === "Delivered" && "100%"}}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                          <div className={`font-semibold text-blue-600`}>
                            Order placed
                          </div>
                          <div className={`font-semibold ${["Processing", "Shipped", "Delivered"].includes(product.deliveryStatus) && "text-blue-600"}`}>
                            Processing
                          </div>
                          <div className={`font-semibold ${["Shipped", "Delivered"].includes(product.deliveryStatus) && "text-blue-600"}`}>Shipped</div>
                          <div className={`font-semibold ${["Delivered"].includes(product.deliveryStatus) && "text-blue-600"}`}>Delivered</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <span
                    className={`w-full h-[1px] my-5 bg-[#C26510] ${
                      index !== orders.length - 1 && "block"
                    }`}
                  ></span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
