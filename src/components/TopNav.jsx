import { Search } from "lucide-react";
import { useState } from "react";

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

export default TopNav;