

import { FaTruck, FaShieldAlt, FaUndo, FaHeadset } from "react-icons/fa";

const features = [
  { icon: <FaTruck />, title: "Free Shipping", text: "On orders over 500 EGP", color: "text-blue-600 bg-blue-50" },
  { icon: <FaShieldAlt />, title: "Secure Payment", text: "100% secure transactions", color: "text-green-600 bg-green-50" },
  { icon: <FaUndo />, title: "Easy Returns", text: "14-day return policy", color: "text-orange-600 bg-orange-50" },
  { icon: <FaHeadset />, title: "24/7 Support", text: "Dedicated support team", color: "text-purple-600 bg-purple-50" },
];

function Features() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map((item) => (
        <div key={item.title} className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${item.color}`}>
            {item.icon}
          </div>
          <div>
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm text-gray-500">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Features;