import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axiosInstance from "../apis/axiosConfig";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const CheckoutForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [prices, setPrices] = useState({
    subTotal: "",
    total: "",
  });

  const { subTotal, total } = prices;

  useEffect(() => {
    const data = localStorage.getItem("ordersLocal");
    if (data) {
      const parsedData = JSON.parse(data);
      setOrderData(parsedData);
      setPrices({
        ...prices,
        subTotal: parsedData.subTotal,
        total: parsedData.total,
      });
      console.log("total", total, "subTotal", subTotal);
    } else {
      navigate("/cart");
    }
  }, []);

  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!props.sendAdderss) {
      return toast.error("Confirm shipping address");
    }
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (paymentMethodError) {
      setPaymentStatus("Payment failed");
      return;
    }

    setIsLoading(true);

    try {
      // Send payment information to server
      const response = await axiosInstance.post(
        "/api/payment/create-payment-intent",
        { amount: total }
      );
      const { clientSecret, paymentIntentId } = response.data;

      const { error: confirmError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: paymentMethod.id,
        }
      );

      if (confirmError) {
        setPaymentStatus("Payment failed");
        navigate("/paymentfailure");
        toast.error("Sorry, payment failed");
      } else {
        // Handle successful payment
        const products = orderData.products.map((order) => ({
          productId: order.productId._id,
          workshopId: order.productId.workshop_id,
          quantity: order.quantity,
          price: order.subTotal,
          color: order.color,
        }));

        await axiosInstance.post("/api/v1/fur/orders/addneworders", {
          products,
          total,
          paymentIntentId,
          status: "paid",
          shippingAddress: props.sendAdderss,
        });

        setPaymentStatus("Payment successful");
        navigate("/paymentsuccess");
        localStorage.removeItem("ordersLocal");
        toast.success("Great, payment successful 🎉");
      }
    } catch (error) {
      console.error("Error handling payment:", error);
      setPaymentStatus("Payment failed");
      toast.error("Sorry, payment failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex justify-start items-center mt-5 w-full"
      //   style={{ backgroundImage: "url('/images/home/2.jpg')" }}
    >
      {isLoading && <Loader />}
      <form
        onSubmit={handleSubmit}
        className=" border border-[#9b9b9bc7] text-white p-6 rounded-lg shadow-lg w-full "
      >
        <h2 className="text-xl font-semibold mb-4">Checkout</h2>
        <div className="mb-4">
          <CardElement className="p-4 bg-gray-700 rounded-lg" />
        </div>
        <button
          type="submit"
          disabled={!stripe}
          className="w-full md:w-fit mt-5 px-6 py-3 text-[#C26510] border border-[#C26510] rounded-3xl hover:text-white hover:bg-[#C26510] duration-500"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
