import { useNavigate } from 'react-router-dom';
import { useArticles } from '../hooks/useArticles';
import { useAuth } from '../hooks/useAuth';
import ArticleForm from '../components/ArticleForm';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';

const CreateArticle = () => {
  const { addArticle } = useArticles();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      await addArticle({
        ...values,
        userId: user.id,
        author: user.name,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: []
      });
      toast.success('Article created successfully!');
      navigate('/articles');
    } catch (error) {
      console.error('Error creating article:', error);
      toast.error('Failed to create article');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-600 to-emerald-900">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white hover:text-emerald-200 transition mb-8"
          >
            <FiArrowLeft className="mr-2" />
            Back to Articles
          </button>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 p-6 text-white">
              <h1 className="text-3xl font-bold mb-2">Create New Article</h1>
              <p className="opacity-90">Share your knowledge with the community</p>
            </div>
            
            <div className="p-6 md:p-8">
              <ArticleForm 
                onSubmit={handleSubmit} 
                loading={isSubmitting}
              />
            </div>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h3 className="font-medium text-lg text-gray-800 mb-4">Tips for a good article</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span>Clear and catchy title</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span>Structure your content with paragraphs</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span>Add relevant images</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span>Choose the right category</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;