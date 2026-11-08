



import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import HeroSlider from "../components/HeroSlider";
import Features from "../components/Features";
import CategoriesSection from "../components/CategoriesSection";
import PromoBanners from "../components/PromoBanners";
import Newsletter from "../components/Newsletter";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await api.get("/products");
        setProducts(data.data);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  return (
    <div>
      <HeroSlider />
      <Features />
      <CategoriesSection />
      <PromoBanners />
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="flex items-center gap-3 text-3xl font-bold mb-8">
          <span className="w-1 h-8 bg-green-600 rounded"></span>
          Featured <span className="text-green-600">Products</span>
        </h2>
        {loading ? (
          <p className="text-center p-10">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.slice(0, 10).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
      <Newsletter />
    </div>
  );
}

export default Home;