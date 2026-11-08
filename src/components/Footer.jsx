


import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaPhone,
  FaRegEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-700 to-slate-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 lg:grid-cols-6 gap-8">
        <div className="lg:col-span-2">
          <div className="inline-flex items-center gap-2 bg-white text-gray-800 text-2xl font-bold rounded-lg px-4 py-2">
            <FaShoppingCart className="text-green-600" /> FreshCart
          </div>
          <p className="mt-5 text-slate-200">
            FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the
            best brands at competitive prices with a seamless shopping experience.
          </p>
          <div className="mt-5 space-y-3 text-slate-200">
            <p className="flex items-center gap-3"><FaPhone className="text-green-400" /> +1 (800) 123-4567</p>
            <p className="flex items-center gap-3"><FaRegEnvelope className="text-green-400" /> support@freshcart.com</p>
            <p className="flex items-center gap-3"><FaMapMarkerAlt className="text-green-400" /> 123 Commerce Street, New York, NY 10001</p>
          </div>
          <div className="flex gap-3 mt-6">
            {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
              <span key={i} className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center">
                <Icon />
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4">Shop</h4>
          <ul className="space-y-3 text-slate-200">
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/brands">Brands</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4">Account</h4>
          <ul className="space-y-3 text-slate-200">
            <li><Link to="/orders">Order History</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/cart">Shopping Cart</Link></li>
            <li><Link to="/login">Sign In</Link></li>
            <li><Link to="/register">Create Account</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4">Support</h4>
          <ul className="space-y-3 text-slate-200">
            <li>Contact Us</li>
            <li>Help Center</li>
            <li>Shipping Info</li>
            <li>Returns & Refunds</li>
            <li>Track Order</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4">Legal</h4>
          <ul className="space-y-3 text-slate-200">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-5 border-t border-slate-600 flex flex-col md:flex-row justify-between text-slate-300 text-sm gap-2">
        <p>© 2026 FreshCart. All rights reserved.</p>
        <p>Visa · Mastercard · PayPal</p>
      </div>
    </footer>
  );
}

export default Footer;