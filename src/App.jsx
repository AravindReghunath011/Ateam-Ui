import React, { useState, useEffect } from 'react';
import { Search, Heart, BookOpen, Users, MessageCircle, ChefHat, Clock, Utensils, Star } from 'lucide-react';
import "./app.css"
// Custom Cursor Component
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('button, a, .clickable')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      className="hidden lg:block fixed pointer-events-none z-50 transition-all duration-200 ease-out"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className={`rounded-full border-2 border-red-500 transition-all duration-300 ${
          isHovering ? 'w-12 h-12 bg-red-500/10' : 'w-6 h-6'
        }`}
      />
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'recipes', label: 'Recipes', icon: Utensils, count: 37 },
    { id: 'favorites', label: 'Favorites', icon: Heart, count: null },
    { id: 'courses', label: 'Courses', icon: BookOpen, count: null },
    { id: 'community', label: 'Community', icon: MessageCircle, count: null },
  ];

  return (
    <div className="fixed bg-white left-0 top-0 h-screen w-64 bg text-black p-6 shadow-2xl hidden lg:block">
      {/* Logo */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <ChefHat className="w-8 h-8 text-black" />
          <span className="text-2xl font-bold text-black">Foodgo</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="mb-8 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 mx-auto mb-3 flex items-center justify-center overflow-hidden shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop" 
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-black font-bold text-lg">Kristin Watson</h3>
        <p className="text-red-400 text-sm">Food enthusiast</p>
        {menuItems[0].count && (
          <div className="mt-3 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <Utensils className="w-4 h-4 text-[#0f0f0f]" />
            <span className="text-[#0f0f0f] font-semibold">{menuItems[0].count}</span>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`clickable w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeSection === item.id
                ? ' text-red-500 '
                : 'text-gray-500 hover:bg-white/10'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Additional Info */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white text-sm">
          <p className="font-medium mb-1">Explore & learn with 12 chefs!</p>
          <p className="text-red-100 text-xs">Join our community today</p>
        </div>
      </div>
    </div>
  );
};

// Top Navigation Bar
const TopNav = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
          <input
            type="text"
            placeholder="Enter your search request..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-sm pl-12 font-semibold pr-4 py-3   border-b-2 border-gray-200 focus:outline-none focus:border-red-500 transition-colors"
          />
        </div>
      </div>

      {/* CTA Button */}
      <button className="clickable ml-6 bg-red-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-600 transition-colors shadow-lg hover:shadow-xl">
        Go to Premium
      </button>
    </div>
  );
};

// Recipe Card Component
const RecipeCard = ({ recipe }) => {
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
// Mentorship Card Component
const MentorshipCard = () => {
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
};

// Main App Component
const App = () => {
  const [activeSection, setActiveSection] = useState('recipes');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 8;

  const fetchRecipes = async (skipCount) => {
    try {
      const response = await fetch(`https://dummyjson.com/recipes?limit=${limit}&skip=${skipCount}`);
      const data = await response.json();
      
      const formattedRecipes = data.recipes.map((recipe) => ({
        id: recipe.id,
        title: recipe.name,
        image: recipe.image,
        time: recipe.prepTimeMinutes + recipe.cookTimeMinutes,
        calories: recipe.caloriesPerServing,
        rating: Math.floor(recipe.rating),
        difficulty: recipe.difficulty,
      }));
      
      if (formattedRecipes.length < limit) {
        setHasMore(false);
      }
      
      return formattedRecipes;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return [];
    }
  };

  useEffect(() => {
    const loadInitialRecipes = async () => {
      const initialRecipes = await fetchRecipes(0);
      setRecipes(initialRecipes);
      setLoading(false);
      setSkip(limit);
    };

    loadInitialRecipes();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (loadingMore || !hasMore) return;

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 200) {
        loadMoreRecipes();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadingMore, hasMore, skip]);

  const loadMoreRecipes = async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    const newRecipes = await fetchRecipes(skip);
    
    if (newRecipes.length > 0) {
      setRecipes((prev) => [...prev, ...newRecipes]);
      setSkip((prev) => prev + limit);
    }
    
    setLoadingMore(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50">
      <CustomCursor />
      
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Navigation */}
        <TopNav />
        
        {/* Main Section */}
        <div className="p-6 lg:p-8">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center shadow-lg">
                  <ChefHat className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                    Only the best recipes!
                  </h1>
                  <p className="text-gray-600 mt-1">Today's new recipes for you</p>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">168</div>
                <div className="text-sm text-gray-600">Tutorials</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">304</div>
                <div className="text-sm text-gray-600">Recipes</div>
              </div>
            </div>
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 mt-20 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-20">
            {loading ? (
              [...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-md h-96 animate-pulse" />
              ))
            ) : (
              <>
                {recipes.map((recipe, index) => (
                  <React.Fragment key={recipe.id} >
                    {index === 3 && <MentorshipCard />}
                    <RecipeCard recipe={recipe} />
                  </React.Fragment>
                ))}
              </>
            )}
          </div>

          {/* Loading More Indicator */}
          {loadingMore && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
                <span className="font-medium">Loading more recipes...</span>
              </div>
            </div>
          )}

          {/* End of Results */}
          {!hasMore && recipes.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-gray-600 font-medium">You've reached the end! 🎉</p>
              <p className="text-gray-500 text-sm mt-1">No more recipes to load</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex justify-around items-center">
          {[
            { id: 'recipes', icon: Utensils },
            { id: 'favorites', icon: Heart },
            { id: 'courses', icon: BookOpen },
            { id: 'community', icon: MessageCircle },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`clickable p-3 rounded-xl transition-colors ${
                activeSection === item.id
                  ? 'bg-red-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-6 h-6" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;