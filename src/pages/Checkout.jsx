
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Checkout() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cartId, setCartId] = useState(null);
  const [form, setForm] = useState({ details: "", phone: "", city: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCartId() {
      try {
        const { data } = await api.get("/cart", { headers: { token } });
        setCartId(data.cartId);
      } catch {
        setError("مفيش كارت، ضيفي منتجات الأول");
      }
    }
    getCartId();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function payCash(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post(`/orders/${cartId}`, { shippingAddress: form }, { headers: { token } });
      alert("تم الأوردر بنجاح ✅");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "حصل خطأ");
    } finally {
      setLoading(false);
    }
  }

  async function payOnline() {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post(
        `/orders/checkout-session/${cartId}?url=${window.location.origin}`,
        { shippingAddress: form },
        { headers: { token } }
      );
      window.location.href = data.session.url;
    } catch (err) {
      setError(err.response?.data?.message || "حصل خطأ");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={payCash} className="max-w-md mx-auto p-6 space-y-3">
      <h2 className="text-2xl font-bold">Checkout</h2>
      <input name="details" placeholder="Address details" value={form.details} onChange={handleChange} className="w-full border p-2 rounded" required />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="w-full border p-2 rounded" required />
      <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="w-full border p-2 rounded" required />
      {error && <p className="text-red-600">{error}</p>}
      <button disabled={loading || !cartId} className="w-full bg-green-600 text-white p-2 rounded">
        Pay cash
      </button>
      <button type="button" onClick={payOnline} disabled={loading || !cartId} className="w-full border border-green-600 text-green-600 p-2 rounded">
        Pay online
      </button>
    </form>
  );
}

export default Checkout;