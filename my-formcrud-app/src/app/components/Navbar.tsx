"use client";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-zinc-950/90 backdrop-blur-md border-b border-amber-900/30 sticky top-0 z-50">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-400 to-amber-700 flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.3)]">
               <span className="text-zinc-950 font-serif text-2xl">S</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-amber-50 group-hover:text-amber-400 transition-colors">
              SpiritVault
            </h2>
          </Link>

          <div className="hidden md:flex space-x-8">
            {["Add Spirit", "Inventory"].map((item, i) => (
              <Link 
                key={i}
                href={item === "Inventory" ? "/view" : "/add"}
                className="text-amber-100/70 hover:text-amber-400 font-medium tracking-wide transition-all relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}