"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { brands, tastingNotes, formProductDataType } from "../../utils/type";
import { toast } from "react-toastify";

export default function EditSpirit() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<formProductDataType | null>(null);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('spirits') || '[]');
    const found = all.find((s: any) => s.id === Number(id));
    if (found) setFormData(found);
  }, [id]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!formData) return;
    const all = JSON.parse(localStorage.getItem('spirits') || '[]');
    const updated = all.map((s: any) => s.id === Number(id) ? formData : s);
    localStorage.setItem('spirits', JSON.stringify(updated));
    toast.info("Collection updated successfully");
    router.push('/view');
  };

  if (!formData) return <div className="p-20 text-center text-amber-500">Loading Vintage...</div>;

  return (
    // Reuse the same UI structure as AddSpirit with formData values
    <div className="min-h-screen bg-zinc-950 py-12 px-4">
        {/* Form code same as Add Page but with defaultValue={formData.productName} etc */}
    </div>
  );
}