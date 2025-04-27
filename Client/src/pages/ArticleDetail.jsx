// ArticleDetail.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useArticles } from '../hooks/useArticles';
import { useComments } from '../hooks/useComments';
import { useAuth } from '../hooks/useAuth';
import CommentSection from '../components/CommentSection';
import Navbar from '../components/Navbar';
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark, FaShare, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { getArticleById } from '../api/articleService';

const ArticleDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { comments, loading: commentsLoading, error: commentsError, postComment, removeComment } = useComments(id);
  const { likeArticle, bookmarkArticle, removeArticle } = useArticles();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleById(id).toPromise();
        if (!data) {
          throw new Error('Article not found');
        }
        setArticle(data);
        setIsLiked(data?.isLiked || false);
        setIsBookmarked(data?.isBookmarked || false);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  const handleLike = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const updated = await likeArticle(id).toPromise();
      setArticle(updated);
      setIsLiked(updated.isLiked);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleBookmark = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const updated = await bookmarkArticle(id).toPromise();
      setArticle(updated);
      setIsBookmarked(updated.isBookmarked);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await removeArticle(id);
        navigate('/articles');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleAddComment = async (commentText) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await postComment({
        content: commentText,
        author: user.name,
        userId: user.id
      });
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await removeComment(commentId);
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-600 to-emerald-900">
        <Navbar />
        <div className="flex justify-center items-center min-h-[80vh]">
          <div className="text-center">
            <FaBookOpen className="mx-auto text-4xl text-white animate-pulse" />
            <p className="mt-4 text-white">Loading article...</p>
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
            <h2 className="text-xl font-bold text-red-600">Error loading article</h2>
            <p className="mt-2 text-gray-600">{error}</p>
            <button
              onClick={() => navigate('/articles')}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
            >
              Back to Articles
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-600 to-emerald-900">
        <Navbar />
        <div className="flex justify-center items-center min-h-[80vh]">
          <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
            <h2 className="text-xl font-bold text-gray-800">Article not found</h2>
            <p className="mt-2 text-gray-600">The article you're looking for doesn't exist.</p>
            <Link
              to="/articles"
              className="inline-block mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
            >
              Browse Articles
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-600 to-emerald-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-white mb-6 hover:text-emerald-200 transition"
        >
          <FaArrowLeft className="mr-2" /> Back to Articles
        </button>
        
        <article className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          {article.image && (
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-96 object-cover"
            />
          )}
          
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full mb-4">
                  {article.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{article.title}</h1>
                <div className="flex items-center text-gray-500 text-sm">
                  <span>By {article.author || 'Unknown'}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex space-x-3">
                {user && user.id === article.userId && (
                  <>
                    <Link
                      to={`/articles/${article.id}/edit`}
                      className="text-gray-400 hover:text-emerald-500 transition"
                      aria-label="Edit"
                    >
                      <FaEdit className="h-6 w-6" />
                    </Link>
                    <button
                      onClick={handleDelete}
                      className="text-gray-400 hover:text-red-500 transition"
                      aria-label="Delete"
                    >
                      <FaTrash className="h-6 w-6" />
                    </button>
                  </>
                )}
                <button 
                  onClick={handleLike}
                  className="flex items-center text-gray-400 hover:text-red-500 transition"
                  aria-label={isLiked ? 'Unlike' : 'Like'}
                >
                  {isLiked ? (
                    <FaHeart className="h-6 w-6 text-red-500" />
                  ) : (
                    <FaRegHeart className="h-6 w-6" />
                  )}
                  <span className="ml-1 text-sm">{article.likes || 0}</span>
                </button>
                <button 
                  onClick={handleBookmark}
                  className="text-gray-400 hover:text-yellow-500 transition"
                  aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                >
                  {isBookmarked ? (
                    <FaBookmark className="h-6 w-6 text-yellow-500" />
                  ) : (
                    <FaRegBookmark className="h-6 w-6" />
                  )}
                </button>
                <button className="text-gray-400 hover:text-blue-500 transition">
                  <FaShare className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="prose max-w-none text-gray-700">
              {article.content.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        </article>

        <CommentSection 
          comments={comments} 
          loading={commentsLoading}
          error={commentsError}
          onAddComment={handleAddComment} 
          onDeleteComment={handleDeleteComment}
          currentUser={user}
        />
      </div>
    </div>
  );
};

export default ArticleDetail;