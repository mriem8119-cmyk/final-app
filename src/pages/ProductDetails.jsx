

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaRegHeart, FaShoppingCart, FaStar, FaRegStar } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    async function getProduct() {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data.data);
        setMainImage(data.data.imageCover);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    getProduct();
  }, [id]);

  async function addToCart() {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      await api.post("/cart", { productId: id }, { headers: { token } });
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
      await api.post("/wishlist", { productId: id }, { headers: { token } });
      toast.success("Added to wishlist");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  }

  if (loading) return <p className="text-center p-10">Loading...</p>;
  if (!product) return <p className="text-center p-10">المنتج مش موجود</p>;

  const rating = Math.round(product.ratingsAverage);
  const hasDiscount = product.priceAfterDiscount && product.priceAfterDiscount < product.price;
  const finalPrice = hasDiscount ? product.priceAfterDiscount : product.price;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <p className="text-sm text-gray-500 mb-6">
        <Link to="/">Home</Link> / <Link to="/products">Shop</Link> / {product.title}
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="border border-gray-100 rounded-2xl p-4 bg-white">
            <img src={mainImage} alt={product.title} className="w-full h-96 object-contain" />
          </div>
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {[product.imageCover, ...(product.images || [])].map((img) => (
              <img
                key={img}
                src={img}
                alt=""
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 object-contain rounded-lg border cursor-pointer ${
                  mainImage === img ? "border-green-600" : "border-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2 text-sm">
            {product.category?.name && (
              <span className="bg-green-50 text-green-600 rounded-full px-3 py-1">{product.category.name}</span>
            )}
            {product.brand?.name && (
              <span className="bg-gray-100 text-gray-600 rounded-full px-3 py-1">{product.brand.name}</span>
            )}
          </div>

          <h1 className="text-3xl font-bold">{product.title}</h1>

          <div className="flex items-center gap-2">
            <span className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((n) => (n <= rating ? <FaStar key={n} /> : <FaRegStar key={n} />))}
            </span>
            <span className="text-gray-500 text-sm">
              {product.ratingsAverage} ({product.ratingsQuantity} reviews)
            </span>
          </div>

          <p className="text-3xl font-bold text-green-600">
            {finalPrice} EGP
            {hasDiscount && <span className="ml-3 text-lg text-gray-400 line-through">{product.price} EGP</span>}
          </p>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <p className="text-sm text-gray-500">
            {product.quantity > 0 ? `In stock: ${product.quantity}` : "Out of stock"}
          </p>

          <div className="flex gap-3 pt-2">
            <button
              onClick={addToCart}
              className="flex-1 bg-green-600 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
            >
              <FaShoppingCart /> Add to Cart
            </button>
            <button
              onClick={addToWishlist}
              className="w-14 border border-gray-200 rounded-xl flex items-center justify-center text-xl text-gray-600 hover:text-red-500"
            >
              <FaRegHeart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;