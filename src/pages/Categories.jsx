


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaThLarge } from "react-icons/fa";
import api from "../api/axios";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCategories() {
      try {
        const { data } = await api.get("/categories");
        setCategories(data.data);
      } finally {
        setLoading(false);
      }
    }
    getCategories();
  }, []);

  return (
    <div>
      <div className="bg-gradient-to-r from-green-600 to-green-400 text-white px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm opacity-90">Home / Categories</p>
          <div className="flex items-center gap-4 mt-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
              <FaThLarge />
            </div>
            <div>
              <h2 className="text-4xl font-bold">All Categories</h2>
              <p className="mt-1">Browse our wide range of product categories</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <p className="text-center p-10">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {categories.map((category) => (
              <Link
                key={category._id}
                to={`/categories/${category._id}`}
                className="group border border-gray-100 rounded-2xl p-4 text-center bg-white hover:shadow-lg hover:border-green-200 transition"
              >
                <img src={category.image} alt={category.name} className="w-full h-56 object-cover rounded-xl" />
                <p className="mt-4 font-bold text-gray-800 group-hover:text-green-600">{category.name}</p>
                <p className="mt-2 text-sm text-green-600 flex items-center justify-center gap-2">
                  View Subcategories <FaArrowRight />
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Categories;