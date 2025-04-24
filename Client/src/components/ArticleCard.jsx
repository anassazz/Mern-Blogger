import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaComment, FaHeart, FaShare } from "react-icons/fa";
import { formatDate } from "../utils/formatDate";

export default function ArticleCard({ article, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {article.image && (
        <div className="h-48 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start">
          <Link to={`/articles/${article.id}`}>
            <h3 className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors">
              {article.title}
            </h3>
          </Link>
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
            {article.category}
          </span>
        </div>
        
        <p className="mt-3 text-gray-600 line-clamp-3">
          {article.content}
        </p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-500 hover:text-primary-600">
              <FaHeart className="mr-1" />
              <span>42</span>
            </button>
            <button className="flex items-center text-gray-500 hover:text-primary-600">
              <FaComment className="mr-1" />
              <span>{article.comments?.length || 0}</span>
            </button>
          </div>
          
          <div className="flex space-x-2">
            <Link
              to={`/articles/${article.id}/edit`}
              className="text-gray-500 hover:text-primary-600"
            >
              <FaEdit />
            </Link>
            <button
              onClick={() => onDelete(article.id)}
              className="text-gray-500 hover:text-red-600"
            >
              <FaTrash />
            </button>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>{formatDate(article.createdAt)}</span>
          <button className="text-gray-500 hover:text-primary-600">
            <FaShare />
          </button>
        </div>
      </div>
    </div>
  );
}