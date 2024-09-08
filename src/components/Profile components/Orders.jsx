import { Link } from "react-router-dom";

export function Orders() {
  return (
    <div className="bg-[#2B2B2B] text-center md:text-start rounded-br-xl rounded-bl-xl relative">
      <span className="absolute bg-[#019ED5] w-full h-[2px] block"></span>
      <div className="p-6 text-[#FBFBFB] flex justify-between">
        <span>No order has been made yet.</span>
        <Link to="/shop" className="underline hover:text-[#C26510]">
          Browse products
        </Link>
      </div>
    </div>
  );
}
