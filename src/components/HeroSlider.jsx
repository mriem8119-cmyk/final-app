

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    title: "Fresh Products Delivered to your Door",
    text: "Get 20% off your first order",
    primary: "Shop Now",
    secondary: "Learn More",
  },
  {
    title: "Premium Quality Guaranteed",
    text: "Fresh from farm to your table",
    primary: "Shop Now",
    secondary: "Learn More",
  },
  {
    title: "Fast & Free Delivery",
    text: "Same day delivery available",
    primary: "Order Now",
    secondary: "Delivery Info",
  },
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  function next() {
    setCurrent((current + 1) % slides.length);
  }

  function prev() {
    setCurrent((current - 1 + slides.length) % slides.length);
  }

  const slide = slides[current];

  return (
    <div className="relative bg-gradient-to-r from-green-600 to-green-400 text-white h-[420px] flex items-center">
      <button
        onClick={prev}
        className="absolute left-4 w-12 h-12 rounded-full bg-white text-gray-600 flex items-center justify-center shadow"
      >
        <FaChevronLeft />
      </button>

      <div className="max-w-7xl mx-auto px-20 w-full">
        <h2 className="text-5xl font-bold max-w-lg leading-tight">{slide.title}</h2>
        <p className="mt-4 text-lg">{slide.text}</p>
        <div className="mt-6 flex gap-3">
          <Link to="/products" className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold">
            {slide.primary}
          </Link>
          <Link to="/products" className="border-2 border-white px-6 py-3 rounded-lg font-semibold">
            {slide.secondary}
          </Link>
        </div>
      </div>

      <button
        onClick={next}
        className="absolute right-4 w-12 h-12 rounded-full bg-white text-gray-600 flex items-center justify-center shadow"
      >
        <FaChevronRight />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 rounded-full transition-all ${
              index === current ? "w-8 bg-white" : "w-3 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;