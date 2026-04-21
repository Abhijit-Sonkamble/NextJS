import { title } from "process";
import Card from "./components/Card";
import Slider from "./components/Slider";



export default function Home() {

  const CardView = [
    {
      title : "Abc",
      description:"Kasvrjfsdf"
    },
    {
      title : "Def",
      description:"jfejkvfjvjv"
    },
    {
      title : "Ghi",
      description:"djfrwjncfjnvfjc"
    },
    {
      title : "Jkm",
      description:"qwertgfdsazxc"
    }
  ]

  return (
  <main className="min-h-screen bg-gray-50 py-10">
  <div className="max-w-7xl mx-auto px-4">
    <Slider />
    
    {/* Horizontal Cards Container */}
    <div className="mt-12 flex flex-wrap justify-center gap-6">
      {CardView.map((item, index) => {
        return (
          <Card 
            key={index} 
            title={item.title} 
            description={item.description} 
          />
        );
      })}
    </div>
  </div>
</main>
  );
}