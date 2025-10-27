import React, { useState, useEffect } from 'react';
import {  Heart, BookOpen, MessageCircle, ChefHat, Utensils, } from 'lucide-react';
import "./App.css"
import Sidebar from './components/SIdeBar.jsx';
import TopNav from './components/TopNav.jsx';
import RecipeCard from './components/RecipeCard.jsx';
import MentorshipCard from './components/MentorShipCard.jsx';
import CustomCursor from './components/CustomCursor.jsx';
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