type CardPropsType = {
  title:string,
  description : string
}


export default function Card({title, description}: any) {
  return (
    <div className="group w-64 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md cursor-pointer">
      
      {/* Top Image / Mockup Area */}
      <div className="relative mx-3 mt-3 flex h-40 items-center justify-center overflow-hidden rounded-xl bg-slate-50">
        
        {/* CSS Mock Phone */}
        <div className="relative h-32 w-16 rounded-xl border-[3px] border-slate-800 bg-slate-900 shadow-md group-hover:scale-105 transition-transform duration-500">
          {/* Screen gradient */}
          <div className="h-full w-full rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 opacity-90 overflow-hidden">
            {/* Screen reflection */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 transform -skew-y-12"></div>
          </div>
          {/* Camera notch */}
          <div className="absolute left-1/2 top-1 h-1 w-4 -translate-x-1/2 rounded-full bg-slate-900"></div>
        </div>
      </div>

      {/* Card Content Details (Sirf Title & Description) */}
      <div className="p-4 text-center">
        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
      
    </div>
  );
}