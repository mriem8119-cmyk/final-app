

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
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
      const { data } = await api.post("/auth/signin", form);
      login(data.token);
      toast.success("Welcome back");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "حصل خطأ، حاولي تاني");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 mt-10 space-y-3 border border-gray-100 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold">Login</h2>
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full border p-2 rounded" />
      {error && <p className="text-red-600">{error}</p>}
      <button disabled={loading} className="w-full bg-green-600 text-white p-2 rounded">
        {loading ? "Loading..." : "Login"}
      </button>
      <div className="flex justify-between text-sm">
        <Link to="/forgot-password" className="text-green-600">
          Forgot password?
        </Link>
        <span>
          مفيش حساب? <Link to="/register" className="text-green-600">Register</Link>
        </span>
      </div>
    </form>
  );
}

export default Login;