import { ChefHat } from "lucide-react";

export default MentorshipCard = () => {
  return (
    <div className="bg-gradient-to-br from-teal-400 via-green-400 to-teal-500 rounded-2xl p-6 shadow-xl text-white relative overflow-hidden">
      <div className="relative z-10">
        <div className="bg-green-900 text-white px-3 py-1 rounded-full inline-block mb-3 text-xs font-bold">
          PRO
        </div>
        <h3 className="text-2xl font-bold mb-3">Mentorship program</h3>
        <p className="text-sm text-white/90 mb-6">
          A mentor will track your progress and give you tips for faster culinary growth.
        </p>
      </div>
      
      {/* Decorative Chef Illustration */}
      <div className="absolute right-4 bottom-0 opacity-20">
        <ChefHat className="w-32 h-32" />
      </div>
    </div>
  );
}