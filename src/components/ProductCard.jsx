


import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart, FaEye, FaPlus, FaStar, FaRegStar, FaSyncAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Stars({ rating }) {
  const full = Math.round(rating);
  return (
    <span className="flex text-yellow-400 text-sm">
      {[1, 2, 3, 4, 5].map((n) => (n <= full ? <FaStar key={n} /> : <FaRegStar key={n} />))}
    </span>
  );
}

function ProductCard({ product }) {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const hasDiscount = product.priceAfterDiscount && product.priceAfterDiscount < product.price;
  const finalPrice = hasDiscount ? product.priceAfterDiscount : product.price;
  const discount = hasDiscount ? Math.round(((product.price - finalPrice) / product.price) * 100) : 0;

  async function addToCart() {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      await api.post("/cart", { productId: product.id }, { headers: { token } });
      toast.success("Added to cart");
      window.dispatchEvent(new Event("cart-updated"));
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  }

  async function addToWishlist() {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      await api.post("/wishlist", { productId: product.id }, { headers: { token } });
      toast.success("Added to wishlist");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden bg-white hover:shadow-lg transition">
      <div className="relative bg-gray-50">
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded z-10">
            -{discount}%
          </span>
        )}
        <Link to={`/product/${product.id}`}>
          <img src={product.imageCover} alt={product.title} className="w-full h-56 object-contain" />
        </Link>
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button onClick={addToWishlist} className="w-9 h-9 bg-white rounded-full shadow flex items-center justify-center text-gray-600 hover:text-red-500">
            <FaRegHeart />
          </button>
          <button className="w-9 h-9 bg-white rounded-full shadow flex items-center justify-center text-gray-600">
            <FaSyncAlt />
          </button>
          <Link to={`/product/${product.id}`} className="w-9 h-9 bg-white rounded-full shadow flex items-center justify-center text-gray-600">
            <FaEye />
          </Link>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500">{product.category?.name}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium line-clamp-2 min-h-12">{product.title}</h3>
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <Stars rating={product.ratingsAverage} />
          <span className="text-xs text-gray-500">
            {product.ratingsAverage} ({product.ratingsQuantity})
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <p>
            <span className={`font-bold ${hasDiscount ? "text-green-600" : "text-gray-800"}`}>{finalPrice} EGP</span>
            {hasDiscount && <span className="ml-2 text-sm text-gray-400 line-through">{product.price} EGP</span>}
          </p>
          <button onClick={addToCart} className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center">
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;