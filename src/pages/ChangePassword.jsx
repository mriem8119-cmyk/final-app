

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function ChangePassword() {
  const navigate = useNavigate();
  const { token, login } = useContext(AuthContext);
  const [form, setForm] = useState({ currentPassword: "", password: "", rePassword: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.put("/users/changeMyPassword", form, { headers: { token } });
      login(data.token);
      toast.success("Password changed successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 mt-10 space-y-3 border border-gray-100 rounded-2xl shadow-sm"
    >
      <h2 className="text-2xl font-bold">Change Password</h2>
      <input
        name="currentPassword"
        type="password"
        required
        placeholder="Current password"
        value={form.currentPassword}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="password"
        type="password"
        required
        placeholder="New password"
        value={form.password}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="rePassword"
        type="password"
        required
        placeholder="Confirm new password"
        value={form.rePassword}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <button disabled={loading} className="w-full bg-green-600 text-white p-2 rounded">
        {loading ? "Saving..." : "Change Password"}
      </button>
    </form>
  );
}

export default ChangePassword;