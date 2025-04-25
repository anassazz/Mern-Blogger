import { useNavigate } from 'react-router-dom';
import { useArticles } from '../hooks/useArticles';
import { useAuth } from '../hooks/useAuth';
import ArticleForm from '../components/ArticleForm';

const CreateArticle = () => {
  const { addArticle } = useArticles();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await addArticle({
        ...values,
        userId: user.id,
        author: user.name,
        createdAt: new Date().toISOString()
      });
      navigate('/');
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Article</h1>
      <ArticleForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateArticle;