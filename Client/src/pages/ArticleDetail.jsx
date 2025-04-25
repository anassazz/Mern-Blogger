import { useParams } from 'react-router-dom';
import { useArticles } from '../hooks/useArticles';
import { useComments } from '../hooks/useComments';
import { useAuth } from '../hooks/useAuth';
import CommentSection from '../components/CommentSection';

const ArticleDetail = () => {
  const { id } = useParams();
  const { article, loading, error } = useArticles(id);
  const { comments, postComment, removeComment } = useComments(id);
  const { user } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>Article not found</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <article className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        {article.image && (
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{article.title}</h1>
          <div className="flex items-center mb-6">
            <span className="text-sm text-gray-500 mr-4">
              {new Date(article.createdAt).toLocaleDateString()}
            </span>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
              {article.category}
            </span>
          </div>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-line">{article.content}</p>
          </div>
        </div>
      </article>

      <CommentSection 
        comments={comments} 
        onAddComment={postComment} 
        onDeleteComment={removeComment}
        currentUser={user}
      />
    </div>
  );
};

export default ArticleDetail;