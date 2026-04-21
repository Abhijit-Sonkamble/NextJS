"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Slider Data
  const slides = [
    {
      id: 1,
      badge: "New Release",
      badgeColor: "bg-slate-800 text-indigo-400 border-slate-700",
      title: "Titanium Pro Max.",
      desc: "Forged in titanium. Our lightest, strongest Pro model ever. Experience the power of the new A18 Bionic chip.",
      btnStyle: "bg-white text-slate-900 hover:bg-gray-100",
      btnText: "Buy Now from $999",
      bgClass: "bg-slate-900 text-white",
      // Custom visual for the dark theme phone
      visual: (
        <div className="relative w-48 h-72 md:w-56 md:h-80 bg-gradient-to-tr from-slate-800 to-slate-600 rounded-[2.5rem] border-[6px] border-slate-800 shadow-2xl flex justify-end p-3 transform rotate-[-5deg] group-hover:rotate-0 transition-transform duration-700">
          <div className="w-14 h-16 bg-slate-900 rounded-2xl border border-slate-700 shadow-inner"></div>
        </div>
      ),
    },
    {
      id: 2,
      badge: "Limited Time",
      badgeColor: "bg-white/20 text-white border-white/10 backdrop-blur-sm",
      title: "Spring Tech Upgrade.",
      desc: "Get up to 30% off on all previous generation flagship phones. Plus, free accessories with every purchase.",
      btnStyle: "bg-gray-900 text-white hover:bg-black",
      btnText: "Shop the Sale",
      bgClass: "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white",
      // Custom visual for the promo theme
      visual: (
        <div className="relative flex gap-4 transform rotate-[5deg] group-hover:scale-105 transition-transform duration-700">
          <div className="w-32 h-48 bg-white/20 backdrop-blur-md rounded-3xl border border-white/30 shadow-2xl"></div>
          <div className="w-32 h-48 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 mt-8 shadow-2xl"></div>
        </div>
      ),
    },
    {
      id: 3,
      badge: "The Future",
      badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
      title: "Galaxy Fold Series Z.",
      desc: "Unfold your world. A massive screen that fits perfectly in your pocket. Multitasking reimagined.",
      btnStyle: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30",
      btnText: "Pre-order Now",
      bgClass: "bg-white text-slate-900 border border-gray-200",
      // Custom visual for the foldable phone
      visual: (
        <div className="relative flex border-4 border-slate-300 rounded-3xl shadow-2xl bg-slate-100 p-1 transform rotate-[2deg] group-hover:rotate-[-2deg] transition-transform duration-700">
          <div className="w-24 h-64 bg-slate-800 rounded-l-2xl border-r border-slate-700"></div>
          <div className="w-24 h-64 bg-slate-800 rounded-r-2xl border-l border-slate-700"></div>
        </div>
      ),
    },
  ];

  // Auto-play logic
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 5000); // Change slide every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div 
      className="relative w-full max-w-6xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slider Track */}
      <div 
        className="flex transition-transform duration-700 ease-out h-[500px] md:h-[450px]"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div 
            key={slide.id}
            className={`min-w-full flex flex-col md:flex-row items-center justify-between p-8 md:p-16 relative overflow-hidden ${slide.bgClass}`}
          >
            {/* Optional background glow for dark mode slide */}
            {slide.id === 1 && (
              <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
            )}

            {/* Text Content */}
            <div className="relative z-10 max-w-md text-center md:text-left">
              <span className={`inline-block py-1 px-3 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border ${slide.badgeColor}`}>
                {slide.badge}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
                {slide.title}
              </h2>
              <p className={`text-lg mb-8 ${slide.id === 1 ? 'text-slate-400' : slide.id === 2 ? 'text-white/80' : 'text-slate-600'}`}>
                {slide.desc}
              </p>
              <button className={`px-8 py-3 rounded-full font-semibold transition-transform hover:scale-105 ${slide.btnStyle}`}>
                {slide.btnText}
              </button>
            </div>

            {/* Visual Content */}
            <div className="mt-10 md:mt-0 relative z-10">
              {slide.visual}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows (Hidden by default, shows on group hover) */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-slate-900" />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-slate-900" />
      </button>

      {/* Bottom Controls (Dots & Play/Pause) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-xl">
        <button 
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="text-white hover:text-indigo-200 transition-colors"
          aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
        >
          {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <div className="w-[1px] h-4 bg-white/30"></div>

        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                current === index 
                  ? "bg-white w-6" 
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}