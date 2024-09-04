import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard.js";
// import ProductCard from "../componant/ProductCard.js";
import Pagination from "../components/Pagination.js";
// import Pagination from "../componant/Pagination.js";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]); // لإضافة التصنيفات
  const [selectedCategory, setSelectedCategory] = useState("All"); // التصنيف المختار يبدأ بـ "All"
  const [priceRange, setPriceRange] = useState([10, 2499]); // نطاق السعر المبدئي
  const [maxPrice, setMaxPrice] = useState(2499); // أقصى سعر
  const productsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    // جلب المنتجات
    axios
      .get("http://localhost:5000/api/v1/fur/products?page=1&limit=10")
      .then((res) => {
        setProducts(res.data.data);

        // إضافة خيار "All" إلى قائمة التصنيفات
        setCategories([
          "All",
          ...new Set(res.data.data.map((p) => p.category)),
        ]);
        setMaxPrice(Math.max(...res.data.data.map((p) => p.price))); // تعيين أقصى سعر
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // تصفية المنتجات بناءً على التصنيف والسعر
  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  );

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleProductClick = (id) => {
    navigate(`/product-details/${id}`);
  };

  return (
    <div className="bg-[#030303] p-5">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="col-span-1">
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

          <div className="mt-8">
            <h2 className="text-white mb-4">Filter By Price</h2>
            <input
              type="range"
              min="10"
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseInt(e.target.value)])
              }
              className="w-full appearance-none h-2 bg-orange-500 rounded-full outline-none"
              style={{
                accentColor: "orange", // لتخصيص شريط التمرير واللون
                WebkitAppearance: "none",
              }}
            />
            <style>
              {`
                input[type="range"]::-webkit-slider-thumb {
                  appearance: none;
                  height: 16px;
                  width: 16px;
                  border-radius: 50%;
                  background: orange; // تخصيص لون السهم البرتقالي
                  cursor: pointer;
                }
                input[type="range"]::-moz-range-thumb {
                  height: 16px;
                  width: 16px;
                  border-radius: 50%;
                  background: orange; // تخصيص لون السهم البرتقالي لمتصفح Firefox
                  cursor: pointer;
                }
              `}
            </style>
            <p className="text-white">
              Price: ₹{priceRange[0]} - ₹{priceRange[1]}
            </p>
          </div>
        </div>

        <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product.id)}
            />
          ))}
        </div>
      </div>

      <div className="pt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Shop;
