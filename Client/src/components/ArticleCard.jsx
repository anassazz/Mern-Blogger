import { Link } from 'react-router-dom';

const ArticleCard = ({ article, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      {article.image && (
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            <Link to={`/articles/${article.id}`} className="hover:text-indigo-600">
              {article.title}
            </Link>
          </h2>
          {onDelete && (
            <button 
              onClick={() => onDelete(article.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          )}
        </div>
        <p className="text-gray-600 mb-4">{article.content.substring(0, 150)}...</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {new Date(article.createdAt).toLocaleDateString()}
          </span>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
            {article.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;