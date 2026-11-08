

import { useState } from "react";
import { FaRegEnvelope, FaArrowRight, FaApple, FaGooglePlay } from "react-icons/fa";
import toast from "react-hot-toast";

function Newsletter() {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    toast.success("Subscribed successfully");
    setEmail("");
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid lg:grid-cols-2 gap-8 bg-green-50/50 rounded-3xl p-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-emerald-500 text-white rounded-xl flex items-center justify-center text-xl">
              <FaRegEnvelope />
            </div>
            <div>
              <p className="text-emerald-600 font-semibold">NEWSLETTER</p>
              <p className="text-sm text-gray-500">50,000+ subscribers</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold mt-6 leading-tight">
            Get the Freshest Updates <span className="text-emerald-500">Delivered Free</span>
          </h2>
          <p className="text-gray-500 mt-3">Weekly recipes, seasonal offers & exclusive member perks.</p>
          <form onSubmit={handleSubmit} className="flex gap-3 mt-6">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 bg-white outline-none"
            />
            <button className="bg-emerald-500 text-white rounded-xl px-6 font-semibold flex items-center gap-2">
              Subscribe <FaArrowRight />
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-3">Unsubscribe anytime. No spam, ever.</p>
        </div>
        <div className="bg-slate-800 text-white rounded-3xl p-8">
          <span className="bg-emerald-500/20 text-emerald-400 text-xs rounded-full px-3 py-1">MOBILE APP</span>
          <h3 className="text-2xl font-bold mt-4">Shop Faster on Our App</h3>
          <p className="text-slate-300 mt-3">Get app-exclusive deals & 15% off your first order.</p>
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 bg-slate-700 rounded-xl px-4 py-3">
              <FaApple className="text-2xl" />
              <div>
                <p className="text-xs text-slate-300">DOWNLOAD ON</p>
                <p className="font-semibold">App Store</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-700 rounded-xl px-4 py-3">
              <FaGooglePlay className="text-2xl" />
              <div>
                <p className="text-xs text-slate-300">GET IT ON</p>
                <p className="font-semibold">Google Play</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-300 mt-5">⭐⭐⭐⭐⭐ 4.9 · 100K+ downloads</p>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;