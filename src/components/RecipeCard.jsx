import { Star, Utensils } from "lucide-react";

export default  RecipeCard = ({ recipe }) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg w-full max-w-xs mx-auto flex flex-col transition-all duration-300 hover:shadow-xl">
      {/* Image Circle - positioned outwards */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Card Content */}
      <div className="pt-20 pb-6 px-6 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-xl font-semibold text-center text-gray-900 mb-4">
          {recipe.title}
        </h3>

        {/* Difficulty Badge */}
        {recipe.difficulty && (
          <div className="text-center mb-6">
            <span className="inline-block bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-semibold">
              {recipe.difficulty}
            </span>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 mb-6">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">{recipe.time}</div>
            <div className="text-sm text-gray-500">Min</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">{recipe.calories}</div>
            <div className="text-sm text-gray-500">Kcal</div>
          </div>
          <div className="text-center">
            <Utensils className="w-6 h-6 text-gray-400 mx-auto" />
          </div>
        </div>

        {/* Rating */}
        <div className="flex justify-center mb-6">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-6 h-6 ${
                i < recipe.rating
                  ? "fill-red-500 text-red-500"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Button - changes color when card is hovered */}
      <button className="w-full bg-white text-black text-lg py-4 font-semibold rounded-b-2xl border-t-2 border-gray-200 transition-all duration-300 group-hover:border-0 group-hover:bg-red-500 group-hover:text-white">
        Start cooking
      </button>
    </div>
  );
};