import { ChefHat, Utensils, Heart, BookOpen, MessageCircle } from "lucide-react";

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


export default Sidebar