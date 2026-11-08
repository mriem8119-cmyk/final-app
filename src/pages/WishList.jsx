

import { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Wishlist() {
  const { token } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getWishlist() {
    try {
      const { data } = await api.get("/wishlist", { headers: { token } });
      setItems(data.data);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  async function removeItem(id) {
    await api.delete(`/wishlist/${id}`, { headers: { token } });
    getWishlist();
  }

  async function addToCart(id) {
    try {
      await api.post("/cart", { productId: id }, { headers: { token } });
      alert("اتضاف للكارت ✅");
    } catch (err) {
      alert(err.response?.data?.message || "حصل خطأ");
    }
  }

  if (loading) return <p className="text-center p-10">Loading...</p>;
  if (items.length === 0) return <p className="text-center p-10">المفضلة فاضية</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Wishlist</h2>
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-4 border rounded-lg p-3">
          <img src={item.imageCover} alt={item.title} className="w-24 h-24 object-cover rounded" />
          <div className="flex-1">
            <h3 className="font-semibold">{item.title}</h3>
            <p>{item.price} EGP</p>
            <button onClick={() => removeItem(item.id)} className="text-red-600 text-sm">
              Remove
            </button>
          </div>
          <button onClick={() => addToCart(item.id)} className="bg-green-600 text-white px-4 py-2 rounded">
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;