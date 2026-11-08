 
 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/auth/signup", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "حصل خطأ، حاولي تاني");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-3">
      <h2 className="text-2xl font-bold">Register</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="rePassword" type="password" placeholder="Confirm password" value={form.rePassword} onChange={handleChange} className="w-full border p-2 rounded" />
      {error && <p className="text-red-600">{error}</p>}
      <button disabled={loading} className="w-full bg-green-600 text-white p-2 rounded">
        {loading ? "Loading..." : "Register"}
      </button>
    </form>
  );
}

export default Register;