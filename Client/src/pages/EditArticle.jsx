import { useParams, useNavigate } from 'react-router-dom';
import { useArticle } from '../hooks/useArticle';
import { useArticles } from '../hooks/useArticles';
import { useAuth } from '../hooks/useAuth';
import ArticleForm from '../components/ArticleForm';

const EditArticle = () => {
  const { id } = useParams();
  const { article, loading, error } = useArticle(id);
  const { editArticle } = useArticles();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>Article not found</div>;

  if (user && user.id !== article.userId) {
    return <div>You are not authorized to edit this article</div>;
  }

  const handleSubmit = async (values) => {
    try {
      await editArticle(id, values);
      navigate(`/articles/${id}`);
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Article</h1>
      <ArticleForm 
        initialValues={{
          title: article.title,
          content: article.content,
          categoryId: article.categoryId,
          image: article.image || ''
        }} 
        onSubmit={handleSubmit} 
      />
    </div>
  );
};

export default EditArticle;