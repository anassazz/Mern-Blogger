import { useState } from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import FilterPanel from '../components/FilterPanel';
import { useArticles } from '../hooks/useArticles';
import { useAuth } from '../hooks/useAuth';

const ArticleList = () => {
  const { articles, loading, error, removeArticle, search, filterByCategory, fetchArticles } = useArticles();
  const { user } = useAuth();

  const handleSearch = (query) => {
    if (query.trim() === '') {
      fetchArticles();
    } else {
      search(query);
    }
  };

  const handleFilterByCategory = (categoryId) => {
    if (!categoryId) {
      fetchArticles();
    } else {
      filterByCategory(categoryId);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <FilterPanel 
          onSearch={handleSearch} 
          onFilterByCategory={handleFilterByCategory} 
        />
      </div>
      <div className="md:col-span-3">
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-600">No articles found</h2>
            {user && (
              <Link 
                to="/create" 
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Create your first article
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {articles.map(article => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                onDelete={user && user.id === article.userId ? removeArticle : null}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleList;