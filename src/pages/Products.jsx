


import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const q = (searchParams.get("q") || "").toLowerCase();
  const brand = searchParams.get("brand");
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      try {
        const params = {};
        if (brand) params.brand = brand;
        if (category) params.category = category;
        if (subcategory) params.subcategory = subcategory;
        const { data } = await api.get("/products", { params });
        setProducts(data.data);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, [brand, category, subcategory]);

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.category?.name?.toLowerCase().includes(q) ||
      p.brand?.name?.toLowerCase().includes(q)
  );

  let title = "All Products";
  if (q) title = `Results for "${q}"`;
  else if (brand) title = products[0]?.brand?.name || "Brand Products";
  else if (category) title = products[0]?.category?.name || "Category Products";
  else if (subcategory) title = "Subcategory Products";

  return (
    <div>
      <div className="bg-gradient-to-r from-green-600 to-green-400 text-white px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm opacity-90">Home / {title}</p>
          <div className="flex items-center gap-4 mt-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
              <FaBoxOpen />
            </div>
            <div>
              <h2 className="text-4xl font-bold">{title}</h2>
              <p className="mt-1">Explore our complete product collection</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          <p className="text-center p-10">Loading...</p>
        ) : (
          <>
            <p className="pt-6 text-gray-600">Showing {filtered.length} products</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {filtered.length === 0 && <p className="text-center p-10">مفيش منتجات هنا</p>}
          </>
        )}
      </div>
    </div>
  );
}

export default Products;