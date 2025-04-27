// ArticleCard.jsx
import { Link } from 'react-router-dom';
import { FaRegComment, FaHeart, FaRegHeart, FaRegBookmark, FaBookmark, FaEdit, FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { deleteArticle, likeArticle } from '../api/articleService';

const ArticleCard = ({ article, onDelete }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(article.isLiked || false);
  const [likes, setLikes] = useState(article.likes || 0);
  const [isBookmarked, setIsBookmarked] = useState(article.isBookmarked || false);

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    try {
      const updated = await likeArticle(article.id).toPromise();
      setIsLiked(updated.isLiked);
      setLikes(updated.likes);
    } catch (err) {
      console.error('Error liking article:', err);
    }
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    setIsBookmarked(!isBookmarked);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await deleteArticle(article.id).toPromise();
        if (onDelete) onDelete(article.id);
      } catch (err) {
        console.error('Error deleting article:', err);
      }
    }
  };

  return (
    <Link to={`/articles/${article.id}`} className="block">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 h-full flex flex-col hover:transform hover:-translate-y-1">
        {article.image && (
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-6 flex-grow">
          <div className="flex justify-between items-start mb-3">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
              {article.category}
            </span>
            <span className="text-xs text-gray-500">
              {new Date(article.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-emerald-600 transition">
            {article.title}
          </h2>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {article.content.substring(0, 200)}...
          </p>
          
          <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
            <div className="flex items-center space-x-4 text-gray-500">
              <button 
                onClick={handleLike}
                className="flex items-center space-x-1 hover:text-red-500"
              >
                {isLiked ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
                <span className="text-xs">{likes}</span>
              </button>
              <div className="flex items-center space-x-1">
                <FaRegComment className="text-sm" />
                <span className="text-xs">{article.commentCount || 0}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {user && user.id === article.userId && (
                <>
                  <Link
                    to={`/articles/${article.id}/edit`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-gray-400 hover:text-emerald-500 transition"
                  >
                    <FaEdit className="text-sm" />
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </>
              )}
              <button 
                onClick={handleBookmark}
                className="text-gray-400 hover:text-yellow-500 transition"
              >
                {isBookmarked ? (
                  <FaBookmark className="text-yellow-500" />
                ) : (
                  <FaRegBookmark />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;