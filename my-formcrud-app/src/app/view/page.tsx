"use client";
import { useState, useEffect, useMemo } from "react";
import { 
  Wine, Trash2, Edit3, Search, 
  IndianRupee, GlassWater as BottleIcon, 
  Star, LayoutGrid, Plus, Filter,
  TrendingUp, Calendar
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ViewCellar() {
  const [spirits, setSpirits] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const router = useRouter();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('spirits') || '[]');
    setSpirits(data);
  }, []);

  const deleteSpirit = (id: number) => {
    const updated = spirits.filter(s => s.id !== id);
    setSpirits(updated);
    localStorage.setItem('spirits', JSON.stringify(updated));
    toast.error("Bottle removed from vault", {
        icon: "🗑️",
        style: { borderRadius: '15px', background: '#18181b', color: '#fef3c7' }
    });
  };

  // Advanced Filtering
  const filteredSpirits = useMemo(() => {
    return spirits.filter(item => {
      const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           item.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [spirits, searchTerm, selectedCategory]);

  const totalValue = spirits.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-amber-50 py-12 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Hero Header --- */}
        <header className="relative mb-16 overflow-hidden rounded-[2.5rem] bg-zinc-900/20 border border-amber-900/10 p-10 backdrop-blur-sm">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-amber-600/10 text-amber-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-500/20">
                  Premium Collection
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight text-white mb-2">The Reserve</h1>
              <p className="text-amber-100/40 italic text-lg max-w-md">Your private vault of liquid gold and timeless spirits.</p>
            </div>
            
            <button 
              onClick={() => router.push('/add')}
              className="group flex items-center gap-3 bg-amber-600 hover:bg-amber-500 text-zinc-950 font-black px-10 py-5 rounded-2xl transition-all shadow-2xl shadow-amber-900/20 active:scale-95"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              ADD NEW SPIRIT
            </button>
          </div>
        </header>

        {/* --- Stats Row --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Inventory" value={spirits.length} unit="Bottles" icon={<BottleIcon />} color="amber" />
          <StatCard title="Total Value" value={`₹${totalValue.toLocaleString()}`} unit="Net Worth" icon={<TrendingUp />} color="emerald" />
          <StatCard title="Varieties" value={new Set(spirits.map(s => s.category)).size} unit="Categories" icon={<LayoutGrid />} color="blue" />
          <StatCard title="Oldest Vintage" value="1992" unit="Heritage" icon={<Calendar />} color="purple" />
        </div>

        {/* --- Controls Bar --- */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center">
          <div className="relative w-full lg:max-w-md group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-amber-500 transition-colors w-5 h-5" />
            <input 
              type="text"
              placeholder="Search vintage name or house..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900/40 border border-zinc-800/50 py-5 pl-14 pr-4 rounded-[1.5rem] focus:border-amber-600 focus:ring-1 focus:ring-amber-600/20 outline-none transition-all text-amber-100 placeholder:text-zinc-700"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto w-full pb-2 scrollbar-hide">
            {["All", "Whiskey", "Vodka", "Rum", "Wine", "Gin"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-8 py-4 rounded-[1.25rem] border text-[10px] font-black uppercase tracking-[0.15em] transition-all whitespace-nowrap ${
                  selectedCategory === cat 
                  ? 'bg-amber-600 border-amber-500 text-zinc-950 shadow-xl shadow-amber-900/20' 
                  : 'bg-zinc-900/40 border-zinc-800/50 text-zinc-500 hover:border-amber-900/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- Spirits Grid --- */}
        {filteredSpirits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredSpirits.map((item) => (
              <div key={item.id} className="group relative bg-zinc-900/30 border border-amber-900/5 rounded-[2.5rem] p-1 transition-all duration-500 hover:border-amber-500/30 hover:bg-zinc-900/50">
                <div className="bg-zinc-950 rounded-[2.2rem] p-8 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-8">
                        <div className="w-14 h-14 bg-amber-500/5 rounded-2xl flex items-center justify-center border border-amber-500/10 group-hover:scale-110 transition-transform">
                            <Wine className="text-amber-500 w-7 h-7" />
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] text-zinc-600 uppercase font-black tracking-widest mb-1">Value</span>
                            <span className="text-2xl font-black text-amber-400">₹{Number(item.price).toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <span className="text-[10px] text-amber-600 font-black uppercase tracking-[0.2em]">{item.category}</span>
                        <h3 className="text-2xl font-bold text-white mt-1 group-hover:text-amber-400 transition-colors">{item.productName}</h3>
                        <p className="text-zinc-500 text-sm italic">{item.brand}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-auto pb-8">
                        {item.notes.map((n: string) => (
                            <span key={n} className="text-[9px] px-3 py-1 bg-zinc-900 border border-zinc-800 text-amber-100/40 rounded-full group-hover:border-amber-900/50">
                                {n}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 pt-6 border-t border-zinc-900">
                        <button 
                            onClick={() => router.push(`/edit/${item.id}`)}
                            className="flex-1 bg-zinc-900 hover:bg-amber-600 hover:text-zinc-950 text-amber-500/70 text-[10px] font-black uppercase tracking-widest py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            <Edit3 className="w-3 h-3" /> EDIT
                        </button>
                        <button 
                            onClick={() => deleteSpirit(item.id)}
                            className="w-14 h-14 bg-zinc-900 hover:bg-red-600/10 text-zinc-700 hover:text-red-500 rounded-xl transition-all flex items-center justify-center border border-transparent hover:border-red-500/20"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-zinc-900/10 rounded-[3rem] border border-dashed border-zinc-900">
            <LayoutGrid className="w-16 h-16 text-zinc-800 mx-auto mb-6" />
            <p className="text-zinc-600 text-lg">No spirits match your search criteria.</p>
            <button onClick={() => {setSearchTerm(""); setSelectedCategory("All")}} className="mt-4 text-amber-500 font-bold underline">Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  );
}

// Attractive Stat Card Sub-component
function StatCard({ title, value, unit, icon, color }: any) {
  const colorMap: any = {
    amber: "text-amber-500 bg-amber-500/5 border-amber-500/10",
    emerald: "text-emerald-500 bg-emerald-500/5 border-emerald-500/10",
    blue: "text-blue-500 bg-blue-500/5 border-blue-500/10",
    purple: "text-purple-500 bg-purple-500/5 border-purple-500/10"
  };

  return (
    <div className="relative overflow-hidden bg-zinc-900/20 border border-zinc-900 p-8 rounded-[2rem] group hover:border-amber-900/30 transition-all">
        <div className={`absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform ${colorMap[color].split(' ')[0]}`}>
            {icon}
        </div>
        <p className="text-[10px] uppercase font-black tracking-widest text-zinc-600 mb-4">{title}</p>
        <div className="flex items-baseline gap-2">
            <h4 className="text-3xl font-black text-white tracking-tighter">{value}</h4>
            <span className="text-[10px] font-bold text-zinc-700 uppercase">{unit}</span>
        </div>
    </div>
  );
}