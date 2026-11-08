


import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaFolderOpen } from "react-icons/fa";
import api from "../api/axios";

function CategoryDetails() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const [cat, sub] = await Promise.all([
          api.get(`/categories/${id}`),
          api.get(`/categories/${id}/subcategories`),
        ]);
        setCategory(cat.data.data);
        setSubs(sub.data.data);
      } catch {
        setSubs([]);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [id]);

  if (loading) return <p className="text-center p-10">Loading...</p>;

  return (
    <div>
      <div className="bg-gradient-to-r from-green-600 to-green-400 text-white px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm opacity-90">
            <Link to="/">Home</Link> / <Link to="/categories">Categories</Link> / {category?.name}
          </p>
          <div className="flex items-center gap-4 mt-4">
            {category?.image && (
              <img src={category.image} alt={category.name} className="w-16 h-16 rounded-2xl object-cover bg-white/20" />
            )}
            <div>
              <h2 className="text-4xl font-bold">{category?.name}</h2>
              <p className="mt-1">Choose a subcategory to browse products</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/categories" className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600">
          <FaArrowLeft /> Back to Categories
        </Link>

        {subs.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-3xl text-gray-400">
              <FaFolderOpen />
            </div>
            <h3 className="text-xl font-bold mt-6">No Subcategories Found</h3>
            <p className="text-gray-500 mt-2">This category doesn't have any subcategories yet.</p>
            <Link
              to={`/products?category=${id}`}
              className="inline-block mt-6 bg-green-600 text-white rounded-lg px-6 py-3 font-semibold"
            >
              View All Products in {category?.name}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
            {subs.map((sub) => (
              <Link
                key={sub._id}
                to={`/products?subcategory=${sub._id}`}
                className="group border border-gray-100 rounded-2xl p-6 bg-white hover:shadow-lg hover:border-green-200 transition"
              >
                <p className="font-bold text-gray-800 group-hover:text-green-600">{sub.name}</p>
                <p className="mt-3 text-sm text-green-600 flex items-center gap-2">
                  View Products <FaArrowRight />
                </p>
              </Link>
            ))}
          </div>
        )}

        {subs.length > 0 && (
          <div className="text-center mt-8">
            <Link to={`/products?category=${id}`} className="text-green-600 font-semibold">
              View All Products in {category?.name}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryDetails;

