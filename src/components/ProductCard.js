import { FaHeart, FaArrowsAltH, FaExpand } from "react-icons/fa";

const ProductCard = ({ product, onClick }) => {
  return (
    <div className="relative group cursor-pointer p-4" onClick={onClick}>
      {/* صورة المنتج */}
      <div className="overflow-hidden relative h-64">
        {" "}
        {/* تأكد من أن الحاوية للصورتين نسبية ولها ارتفاع ثابت */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ease-in-out" // تم إضافة transition-duration أطول وتخفيف
        />
        {/* صورة Hover */}
        <img
          src={product.images[1]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out"
        />
        {/* زر Select Options في أسفل الصورة */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out z-10">
          <a href="#" className="text-white text-lg font-semibold p-4">
            Select Options
          </a>
        </div>
      </div>

      {/* اسم المنتج والسعر */}
      <div className="mt-3 mb-3 text-center">
        <p className="text-lg text-white font-semibold">{product.name}</p>
        <p className="text-sm pb-2 text-gray-500">{product.price} ₹</p>
      </div>

      {/* الأيقونات */}
      <div className="absolute top-3 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out z-10">
        <div className="p-2 bg-transparent rounded-full hover:bg-orange-500 transition-colors">
          <FaHeart className="text-black" />
        </div>
        <div className="p-2 bg-transparent rounded-full hover:bg-orange-500 transition-colors">
          <FaArrowsAltH className="text-black" />
        </div>
        <div className="p-2 bg-transparent rounded-full hover:bg-orange-500 transition-colors">
          <FaExpand className="text-black" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
