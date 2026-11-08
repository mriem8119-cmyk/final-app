

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";

function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendEmail(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/forgotPasswords", { email });
      toast.success("Code sent to your email");
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function verifyCode(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/verifyResetCode", { resetCode: code });
      toast.success("Code verified");
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put("/auth/resetPassword", { email, newPassword });
      toast.success("Password changed, please login");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 mt-10 border border-gray-100 rounded-2xl shadow-sm space-y-4">
      <h2 className="text-2xl font-bold">Forgot Password</h2>

      {step === 1 && (
        <form onSubmit={sendEmail} className="space-y-3">
          <p className="text-gray-500">Enter your email and we'll send you a reset code.</p>
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button disabled={loading} className="w-full bg-green-600 text-white p-2 rounded">
            {loading ? "Sending..." : "Send Code"}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={verifyCode} className="space-y-3">
          <p className="text-gray-500">Enter the code we sent to {email}.</p>
          <input
            required
            placeholder="Reset code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button disabled={loading} className="w-full bg-green-600 text-white p-2 rounded">
            {loading ? "Verifying..." : "Verify Code"}
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={resetPassword} className="space-y-3">
          <p className="text-gray-500">Choose your new password.</p>
          <input
            type="password"
            required
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button disabled={loading} className="w-full bg-green-600 text-white p-2 rounded">
            {loading ? "Saving..." : "Reset Password"}
          </button>
        </form>
      )}

      <Link to="/login" className="block text-center text-green-600">
        Back to Login
      </Link>
    </div>
  );
}

export default ForgotPassword;