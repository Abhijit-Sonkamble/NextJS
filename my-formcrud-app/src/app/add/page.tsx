"use client";
import { useState } from "react";
import { brands, tastingNotes, categories, formProductDataType } from "../utils/type";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AddSpirit() {
  const router = useRouter();
  const [formData, setFormData] = useState<formProductDataType>({
    id: Math.floor(Math.random() * 10000),
    productName: "",
    vintage: "",
    price: 0,
    brand: "",
    notes: [],
    category: "" // Isme Whiskey, Vodka, etc store hoga
  });

  const onHandleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };

  const onNoteChange = (note: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      notes: checked 
        ? [...prev.notes, note] 
        : prev.notes.filter(n => n !== note)
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    // Simple Validation
    if(!formData.productName || !formData.category || !formData.brand) {
        return toast.error("Please fill all required fields!");
    }

    const existing = JSON.parse(localStorage.getItem('spirits') || '[]');
    localStorage.setItem('spirits', JSON.stringify([...existing, formData]));
    toast.success(`${formData.productName} added to the reserve!`);
    router.push('/view');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-amber-50 py-12 px-4 selection:bg-amber-500/30">
      <div className="max-w-3xl mx-auto bg-zinc-900/40 border border-amber-900/20 p-8 rounded-3xl shadow-2xl backdrop-blur-md">
        <div className="text-center mb-10">
            <h1 className="text-4xl font-serif font-bold text-amber-400 tracking-tight">Spirit Registration</h1>
            <p className="text-amber-100/40 text-sm mt-2 italic">Enter the details of the new vintage bottle</p>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-8">
          {/* 1. Basic Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-amber-600 font-bold">Product Name *</label>
              <input 
                name="productName" 
                required
                onChange={onHandleChange} 
                className="w-full bg-zinc-950/50 border border-zinc-800 p-3 rounded-xl focus:border-amber-500 outline-none transition-all placeholder:text-zinc-700" 
                placeholder="e.g. Black Label, Grey Goose" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-amber-600 font-bold">Price (₹) *</label>
              <input 
                name="price" 
                type="number" 
                required
                onChange={onHandleChange} 
                className="w-full bg-zinc-950/50 border border-zinc-800 p-3 rounded-xl focus:border-amber-500 outline-none" 
              />
            </div>
          </div>

          {/* 2. Dropdown (Manufacturer/Brand) */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-amber-600 font-bold">Manufacturer / House *</label>
            <select 
              name="brand" 
              required
              onChange={onHandleChange} 
              className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl focus:border-amber-500 outline-none appearance-none cursor-pointer"
            >
              <option value="" className="bg-zinc-900">Select Brand</option>
              {brands.map(b => <option key={b} value={b} className="bg-zinc-900">{b}</option>)}
            </select>
          </div>

          {/* 3. Radio Buttons (Spirit Type Category) */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.2em] text-amber-600 font-bold">Spirit Category *</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {categories.map((cat) => (
                <label key={cat} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.category === cat ? 'bg-amber-600/10 border-amber-500 text-amber-400' : 'bg-zinc-950/50 border-zinc-800 text-zinc-500 hover:border-zinc-700'}`}>
                  <input 
                    type="radio" 
                    name="category" 
                    value={cat} 
                    checked={formData.category === cat}
                    onChange={onHandleChange}
                    className="w-4 h-4 accent-amber-500"
                  />
                  <span className="text-sm font-medium">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 4. Checkboxes (Tasting Notes) */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.2em] text-amber-600 font-bold">Flavor Profile & Notes</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {tastingNotes.map(note => (
                <label key={note} className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      value={note}
                      checked={formData.notes.includes(note)}
                      onChange={(e) => onNoteChange(note, e.target.checked)}
                      className="w-5 h-5 rounded border-zinc-800 bg-zinc-950 checked:bg-amber-600 checked:border-amber-500 transition-all appearance-none border" 
                    />
                    {formData.notes.includes(note) && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <svg className="w-3 h-3 text-zinc-950 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                    )}
                  </div>
                  <span className={`text-sm transition-colors ${formData.notes.includes(note) ? 'text-amber-200' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                    {note}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 5. Submit Button */}
          <div className="pt-6">
            <button className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-zinc-950 font-black rounded-xl transition-all shadow-lg shadow-amber-900/20 uppercase tracking-[0.2em] text-sm active:scale-95">
              Secure in Vault
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}