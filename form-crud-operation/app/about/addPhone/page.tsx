'use client'

import { useState } from "react";

export default function addPhone() {
  const storage = ["64GB", "128GB", "256GB", "512GB"];
  const Features = ["5G", "Fast Charging", "Dual Sim", "Pro Camera"];

  // Typescript asalya mule datatype define karun dyayla
type formDataType ={
  id:number,
  phoneName:string,
  brand:string,
  price: number,
  storage: string,
  condition: string,
  features: string[]

}

  // UseState for all data yayla pahije
  const [formData, setFormData] = useState<formDataType>({
    id: Math.floor(Math.random() * 1000),
    phoneName: "",
    brand: "",
    price: 0,
    storage: "",
    condition: "",
    features : []

  })

  const onSubmit = (event:any) => {
    event.preventDefault();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        
        <div className="mb-8 border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Add New Phone</h2>
          <p className="text-sm text-gray-500 mt-1">Enter the details of the device below.</p>
        </div>

        <form action="" className="space-y-6" onSubmit={onSubmit}>
          {/* Phone Name */}
          <div>
            <label htmlFor="phoneName" className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Name
            </label>
            <input
              type="text"
              name="phoneName"
              placeholder="e.g. iPhone 15 Pro"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
            />
          </div>

          {/* Brand & Price (Grid Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="brand" className="block text-sm font-semibold text-gray-700 mb-2">
                Brand
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                placeholder="e.g. Apple"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="999"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Storage Select */}
          <div>
            <label htmlFor="storage" className="block text-sm font-semibold text-gray-700 mb-2">
              Storage Capacity
            </label>
            <select
              id="storage"
              name="storage"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 cursor-pointer"
            >
              <option value="" className="text-gray-400">Select Storage</option>
              {storage.map((storagePhone, index) => {
                return (
                  <option key={index} value={storagePhone}>
                    {storagePhone}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Condition Radio Buttons */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Device Condition
            </label>
            <div className="flex items-center space-x-6">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  id="new"
                  name="condition"
                  value="new"
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 cursor-pointer"
                />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                  Brand New
                </span>
              </label>

              <label className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  id="used"
                  name="condition"
                  value="used"
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 cursor-pointer"
                />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                  Used / Refurbished
                </span>
              </label>
            </div>
          </div>

          {/* Features Checkboxes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Key Features
            </label>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
              {Features.map((FeaturesPhone, index) => {
                return (
                  <label key={index} className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      id={`feature-${index}`}
                      name="features"
                      value={FeaturesPhone}
                      className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                      {FeaturesPhone}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              Add Phone to Inventory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}