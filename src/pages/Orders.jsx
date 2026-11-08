


import { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Orders() {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getOrders() {
      try {
        const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        const userId = JSON.parse(atob(payload)).id;
        const { data } = await api.get(`/orders/user/${userId}`);
        setOrders(Array.isArray(data) ? data : data.data || []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }
    getOrders();
  }, [token]);

  if (loading) return <p className="text-center p-10">Loading...</p>;
  if (orders.length === 0) return <p className="text-center p-10">مفيش أوردرات لسه</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">My Orders</h2>
      {orders.map((order) => (
        <div key={order.id || order._id} className="border rounded-lg p-4 space-y-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            <span>{order.paymentMethodType === "cash" ? "Cash" : "Card"}</span>
            <span>{order.isDelivered ? "Delivered ✅" : "Processing ⏳"}</span>
          </div>
          {order.cartItems.map((item) => (
            <div key={item._id} className="flex items-center gap-3">
              <img src={item.product.imageCover} alt={item.product.title} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <p className="font-semibold">{item.product.title}</p>
                <p className="text-sm">
                  {item.count} × {item.price} EGP
                </p>
              </div>
            </div>
          ))}
          <p className="font-bold text-green-600">Total: {order.totalOrderPrice} EGP</p>
        </div>
      ))}
    </div>
  );
}

export default Orders;