import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ProductCard from "../componant/ProductCard.js";
import Pagination from "../componant/Pagination.js";
import { FaHome } from "react-icons/fa";


const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([10, 2499]);
  const [maxPrice, setMaxPrice] = useState(2499);
  const productsPerPage = 10;
  const navigate = useNavigate();

  // جلب المنتجات من الـ API
  const fetchProducts = (page) => {
    axios
      .get(
        `http://localhost:5000/api/v1/fur/products?page=${page}&limit=${productsPerPage}`
      )
      .then((res) => {
        setProducts(res.data.data);
        setTotalPages(res.data.pages || 1);

        setCategories([
          "All",
          ...new Set(res.data.data.map((p) => p.category)),
        ]);
        setMaxPrice(Math.max(...res.data.data.map((p) => p.price)));

      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  // تصفية المنتجات بناءً على الفئة ونطاق السعر
  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  );

  // التعامل مع النقر على منتج لتوجيه المستخدم إلى تفاصيل المنتج
  const handleProductClick = (id) => {
    navigate(`/product-details/${id}`);
  };

  return (
    <>
      {/* قسم الهيدر مع خلفية الصورة */}
      <div
        className="relative h-[400px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/home-hotspot-img-1.jpg')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl font-semibold">Shop</h1>
          <div className="flex items-center justify-center gap-2 mt-2 text-sm"></div>
        </div>
      </div>

      <div className="bg-[#030303] p-5">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* قسم الفئات مع الخط الفاصل */}
          <div className="col-span-1 relative">
            <h2 className="text-white mb-4">Collection</h2>
            <ul className="text-white space-y-2">
              {categories.map((category) => (
                <li
                  key={category}
                  className={`cursor-pointer ${
                    selectedCategory === category
                      ? "text-orange-500 font-bold"
                      : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            {/* الخط الفاصل بين قسم الفئات وقسم فلتر السعر */}
            <div className="absolute top-0 right-0 h-full border-r-4 border-gray-700 lg:block hidden"></div>{" "}
            {/* تحريك الخط الفاصل لليسار */}
            <div className="mt-12">
              {/* زيادة المسافة بين الفئات وفلتر السعر */}
              <div className="mb-6">
                <h2 className="text-white mb-4">Filter By Price</h2>
              </div>
              <input
                type="range"
                min="10"
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], parseInt(e.target.value)])
                }
                className="w-11/12 appearance-none h-3 bg-gray-700 rounded-full outline-none range-input"
                style={{
                  WebkitAppearance: "none",
                  margin: "10px 0", // المسافة حول الشريط
                }}
              />
              <style>
                {`
                .range-input::-webkit-slider-runnable-track {
                  height: 7px; /* جعل الخط أعرض */
                  background: linear-gradient(
                    to right,
                    orange 0%,
                    orange ${(priceRange[1] / maxPrice) * 100}%,
                    #555 ${(priceRange[1] / maxPrice) * 100}%,
                    #555 100%
                  );
                  border-radius: 8px;
                }

                .range-input::-moz-range-track {
                  height: 8px; /* جعل الخط أعرض */
                  background: linear-gradient(
                    to right,
                    orange 0%,
                    orange ${(priceRange[1] / maxPrice) * 100}%,
                    #555 ${(priceRange[1] / maxPrice) * 100}%,
                    #555 100%
                  );
                  border-radius: 8px;
                }

                .range-input::-webkit-slider-thumb {
                  appearance: none;
                  height: 15px;
                  width: 15px;
                  margin-top: -5px; /* لضبط السهم ليكون في منتصف الشريط */
                  border-radius: 50%;
                  background: orange;
                  cursor: pointer;
                  border: 2px solid #030303;
                }

                .range-input::-moz-range-thumb {
                  height: 16px;
                  width: 16px;
                  border-radius: 50%;
                  background: orange;
                  cursor: pointer;
                  border: 2px solid #030303;
                }
              `}
              </style>
              <p className="text-white">
                Price: ₹{priceRange[0]} - ₹{priceRange[1]}
              </p>
            </div>
          </div>

          {/* قسم عرض المنتجات */}
          <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {" "}
            {/* تقليص المسافة بين المنتجات */}
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product.id)}
              />
            ))}
          </div>
        </div>

        <div className="pt-8">
          {/* قسم الترقيم */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default Shop;
