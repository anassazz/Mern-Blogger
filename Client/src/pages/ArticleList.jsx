// ArticleList.jsx
import { useArticles } from '../hooks/useArticles';
import { Link } from 'react-router-dom';
import { FaPlus, FaBookOpen, FaSearch } from 'react-icons/fa';
import ArticleCard from '../components/ArticleCard';
import Navbar from '../components/Navbar';
import { useState } from 'react';

const ArticleList = () => {
  const { articles, loading, error, removeArticle, search } = useArticles();
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await removeArticle(id);
      } catch (err) {
        console.error('Error deleting article:', err);
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    search(searchQuery);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-600 to-emerald-900">
        <Navbar />
        <div className="flex justify-center items-center min-h-[80vh]">
          <div className="text-center">
            <FaBookOpen className="mx-auto text-4xl text-white animate-pulse" />
            <p className="mt-4 text-white">Loading articles...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-600 to-emerald-900">
        <Navbar />
        <div className="flex justify-center items-center min-h-[80vh]">
          <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
            <h2 className="text-xl font-bold text-red-600">Error loading articles</h2>
            <p className="mt-2 text-gray-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-600 to-emerald-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Latest Articles</h1>
            <p className="text-emerald-100 mt-2">Discover and share knowledge with our community</p>
          </div>
          <Link
            to="/articles/create"
            className="flex items-center gap-2 bg-white hover:bg-emerald-100 text-emerald-800 px-6 py-3 rounded-lg shadow-md transition font-medium"
          >
            <FaPlus /> Create Article
          </Link>
        </div>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full px-4 py-3 pl-12 rounded-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600"
            >
              <FaSearch />
            </button>
          </div>
        </form>

        {!articles || articles.length === 0 ? (
          <div className="text-center py-16 bg-white bg-opacity-90 rounded-xl shadow-sm">
            <FaBookOpen className="mx-auto text-5xl text-emerald-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700">No articles yet</h3>
            <p className="mt-2 text-gray-500 mb-6">Be the first to share your knowledge</p>
            <Link
              to="/articles/create"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition"
            >
              <FaPlus /> Create Article
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map(article => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                onDelete={() => handleDelete(article.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleList;