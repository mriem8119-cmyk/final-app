

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import api from "../api/axios";

function CategoriesSection() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      try {
        const { data } = await api.get("/categories");
        setCategories(data.data);
      } catch {
        setCategories([]);
      }
    }
    getCategories();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="flex items-center gap-3 text-3xl font-bold">
          <span className="w-1 h-8 bg-green-600 rounded"></span>
          Shop By <span className="text-green-600">Category</span>
        </h2>
        <Link to="/categories" className="text-green-600 font-medium flex items-center gap-2">
          View All Categories <FaArrowRight />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            to="/categories"
            key={category._id}
            className="border border-gray-100 rounded-xl p-5 text-center hover:shadow-lg transition"
          >
            <img src={category.image} alt={category.name} className="w-24 h-24 rounded-full object-cover mx-auto" />
            <p className="mt-3 text-gray-700">{category.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategoriesSection;