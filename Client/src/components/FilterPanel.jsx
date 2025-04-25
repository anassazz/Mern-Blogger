import { useState } from 'react';
import { useCategories } from '../hooks/useCategories';

const FilterPanel = ({ onSearch, onFilterByCategory }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { categories } = useCategories();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Search
          </button>
        </div>
      </form>

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Filter by category</h3>
        <div className="space-y-2">
          <button
            onClick={() => onFilterByCategory(null)}
            className="block w-full text-left px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
          >
            All Categories
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => onFilterByCategory(category.id)}
              className="block w-full text-left px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;