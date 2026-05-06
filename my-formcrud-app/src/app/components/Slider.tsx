'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, GlassWater } from 'lucide-react';

type Slide = {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
}

const slides: Slide[] = [
    {
        id: 1,
        title: "Single Malt Reserve",
        subtitle: "The Highland Legacy",
        description: "Explore the deep, smoky character of aged oak and peat. A timeless journey through the heart of the Scottish Highlands.",
        image: "https://images.unsplash.com/photo-1527281405159-35d5b5d71101?q=80&w=2070&auto=format&fit=crop", 
    },
    {
        id: 2,
        title: "Vintage Wine Cellar",
        subtitle: "Aged to Perfection",
        description: "From the sun-drenched vineyards of Bordeaux to your private vault. Rare vintages that define luxury and sophistication.",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop", 
    },
    {
        id: 3,
        title: "Artisanal Gin Craft",
        subtitle: "Botanical Infusion",
        description: "A crisp blend of juniper berries and exotic botanicals. Perfectly distilled for the modern connoisseur's palate.",
        image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=2070&auto=format&fit=crop",
    }
];

export default function Slider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-[90vh] min-h-[600px] w-full bg-zinc-950 overflow-hidden font-sans border-b border-amber-900/20">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#fbbf2412_1px,transparent_1px),linear-gradient(to_bottom,#fbbf2412_1px,transparent_1px)] bg-[size:32px_32px] z-0"></div>

            {slides.map((slide, index) => {
                const isActive = index === currentSlide;
                
                return (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 flex items-center transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                            isActive ? 'opacity-100 z-20' : 'opacity-0 z-0 pointer-events-none'
                        }`}
                    >
                        {/* Image Container with Amber Overlay */}
                        <div className={`absolute top-0 right-0 w-full md:w-[70%] h-full overflow-hidden transition-transform duration-1000 delay-100 ${isActive ? 'translate-x-0' : 'translate-x-[10%]'}`}>
                            <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/80 to-transparent z-10 w-full md:w-[60%] left-0" />
                            <div className="absolute inset-0 bg-amber-900/10 z-10 mix-blend-color" />
                            
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className={`w-full h-full object-cover object-center transition-transform duration-[4000ms] ease-out ${isActive ? 'scale-105' : 'scale-125'}`}
                            />
                        </div>

                        {/* Content */}
                        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center h-full">
                            <div className="md:w-1/2">
                                <div className={`transition-all duration-1000 delay-300 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-1 bg-amber-500 rounded-full shadow-[0_0_15px_#f59e0b]"></div>
                                        <span className="text-amber-500 font-bold uppercase tracking-[0.3em] text-xs">
                                            {slide.subtitle}
                                        </span>
                                    </div>
                                    
                                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-black text-white leading-[1.05] tracking-tighter mb-8 drop-shadow-2xl">
                                        {slide.title.split(' ')[0]} <br />
                                        <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-amber-500 to-amber-700">
                                            {slide.title.split(' ').slice(1).join(' ')}
                                        </span>
                                    </h1>
                                    
                                    <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-md leading-relaxed border-l border-amber-900/50 pl-6 italic">
                                        "{slide.description}"
                                    </p>

                                    <button className="mt-10 px-8 py-4 bg-amber-600/10 border border-amber-500/30 text-amber-400 font-bold uppercase tracking-widest text-sm rounded-full hover:bg-amber-500 hover:text-zinc-950 transition-all duration-300 backdrop-blur-sm">
                                        Explore Collection
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}

            {/* Navigation Buttons */}
            <div className="absolute bottom-10 left-6 md:left-12 z-30 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                <div className="flex gap-3">
                    <button
                        onClick={prevSlide}
                        className="p-4 bg-zinc-900/60 backdrop-blur-xl border border-amber-900/20 hover:border-amber-500/50 text-amber-500 rounded-full transition-all duration-300 group shadow-lg"
                    >
                        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="p-4 bg-zinc-900/60 backdrop-blur-xl border border-amber-900/20 hover:border-amber-500/50 text-amber-500 rounded-full transition-all duration-300 group shadow-lg"
                    >
                        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Indicators */}
                <div className="flex items-center gap-4">
                    <span className="text-amber-900 font-bold font-mono text-sm tracking-tighter">ESTB.</span>
                    <div className="flex gap-3">
                        {slides.map((_, i) => (
                            <div 
                                key={i} 
                                onClick={() => setCurrentSlide(i)}
                                className={`h-1 cursor-pointer rounded-full transition-all duration-500 ${
                                    currentSlide === i 
                                    ? 'w-12 bg-amber-500 shadow-[0_0_15px_#f59e0b]' 
                                    : 'w-3 bg-zinc-800 hover:bg-amber-900'
                                }`} 
                            />
                        ))}
                    </div>
                    <span className="text-amber-900 font-bold font-mono text-sm tracking-tighter">2026</span>
                </div>
            </div>

            {/* Vertical Number Indicator */}
            <div className="absolute top-1/2 right-12 z-10 hidden lg:block -translate-y-1/2 rotate-90 transform origin-right">
                <span className="text-amber-500 font-serif font-black text-[10rem] uppercase tracking-tighter opacity-5 pointer-events-none select-none">
                    VINTAGE
                </span>
            </div>
        </div>
    );
}