

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaTags } from "react-icons/fa";
import api from "../api/axios";

function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getBrands() {
      try {
        const { data } = await api.get("/brands");
        setBrands(data.data);
      } finally {
        setLoading(false);
      }
    }
    getBrands();
  }, []);

  return (
    <div>
      <div className="bg-gradient-to-r from-indigo-700 to-purple-500 text-white px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm opacity-90">Home / Brands</p>
          <div className="flex items-center gap-4 mt-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
              <FaTags />
            </div>
            <div>
              <h2 className="text-4xl font-bold">Top Brands</h2>
              <p className="mt-1">Shop from your favorite brands</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <p className="text-center p-10">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {brands.map((brand) => (
              <Link
                key={brand._id}
                to={`/products?brand=${brand._id}`}
                className="group border border-gray-100 rounded-2xl p-6 text-center bg-white hover:shadow-lg transition"
              >
                <img src={brand.image} alt={brand.name} className="w-full h-32 object-contain" />
                <p className="mt-4 text-gray-700 font-medium">{brand.name}</p>
                <p className="mt-2 text-sm text-indigo-700 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                  View Products <FaArrowRight />
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Brands;