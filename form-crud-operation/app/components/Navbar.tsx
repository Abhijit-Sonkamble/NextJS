import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand / Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              href="/" 
              className="text-2xl font-extrabold text-slate-900 tracking-tight hover:text-indigo-600 transition-colors"
            >
              Phone<span className="text-indigo-600">.</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav>
            <ul className="flex items-center space-x-1 sm:space-x-4">
              <li>
                <Link 
                  href="/" 
                  className="text-slate-600 hover:text-indigo-600 hover:bg-slate-50 px-3 py-2 rounded-md text-sm font-medium transition-all"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-slate-600 hover:text-indigo-600 hover:bg-slate-50 px-3 py-2 rounded-md text-sm font-medium transition-all"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/about/addPhone" 
                  className="text-slate-600 hover:text-indigo-600 hover:bg-slate-50 px-3 py-2 rounded-md text-sm font-medium transition-all"
                >
                  Add Phone
                </Link>
              </li>
              <li>
                <Link 
                  href="/viewPhone" 
                  className="text-slate-600 hover:text-indigo-600 hover:bg-slate-50 px-3 py-2 rounded-md text-sm font-medium transition-all"
                >
                  View Phone
                </Link>
              </li>
              
              {/* Call to Action Button */}
              <li className="pl-2">
                <Link 
                  href="/contact" 
                  className="bg-indigo-600 text-white hover:bg-indigo-700 px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>

        </div>
      </div>
    </header>
  );
}