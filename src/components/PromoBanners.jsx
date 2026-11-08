

import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function PromoBanners() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-2 gap-6">
      <div className="rounded-2xl p-8 text-white bg-gradient-to-br from-green-600 to-emerald-400">
        <span className="bg-white/20 rounded-full px-3 py-1 text-sm">Deal of the Day</span>
        <h3 className="text-3xl font-bold mt-4">Fresh Organic Fruits</h3>
        <p className="mt-2">Get up to 40% off on selected organic fruits</p>
        <p className="mt-4 text-4xl font-bold">
          40% OFF <span className="text-sm font-normal">Use code: ORGANIC40</span>
        </p>
        <Link to="/products" className="inline-flex items-center gap-2 mt-6 bg-white text-green-600 rounded-full px-6 py-3 font-semibold">
          Shop Now <FaArrowRight />
        </Link>
      </div>
      <div className="rounded-2xl p-8 text-white bg-gradient-to-br from-orange-500 to-red-600">
        <span className="bg-white/20 rounded-full px-3 py-1 text-sm">New Arrivals</span>
        <h3 className="text-3xl font-bold mt-4">Exotic Vegetables</h3>
        <p className="mt-2">Discover our latest collection of premium vegetables</p>
        <p className="mt-4 text-4xl font-bold">
          25% OFF <span className="text-sm font-normal">Use code: FRESH25</span>
        </p>
        <Link to="/products" className="inline-flex items-center gap-2 mt-6 bg-white text-orange-600 rounded-full px-6 py-3 font-semibold">
          Explore Now <FaArrowRight />
        </Link>
      </div>
    </section>
  );
}

export default PromoBanners;