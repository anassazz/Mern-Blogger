import { useNavigate } from 'react-router-dom';
import { useArticles } from '../hooks/useArticles';
import { useAuth } from '../hooks/useAuth';
import ArticleForm from '../components/ArticleForm';
import Navbar from '../components/Navbar';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { useState } from 'react';
import { toast } from 'react-toastify';

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
      toast.success('Article créé avec succès!');
      navigate('/');
    } catch (error) {
      console.error('Error creating article:', error);
      toast.error('Erreur lors de la création de l\'article');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    'Technology',
    'Science',
    'Business',
    'Health',
    'Entertainment',
    'Education'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition"
          >
            <FiArrowLeft className="mr-2" />
            Retour aux articles
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Créer un nouvel article</h1>
            <p className="opacity-90">Partagez vos connaissances avec la communauté</p>
          </div>
          
          <div className="p-6 md:p-8">
            <ArticleForm 
              onSubmit={handleSubmit} 
              isSubmitting={isSubmitting}
              categories={categories}
              initialValues={{
                title: '',
                content: '',
                category: '',
                imageUrl: '',
                summary: ''
              }}
              renderButtons={({ isValid }) => (
                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                    disabled={isSubmitting}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className={`px-6 py-2 rounded-md text-white font-medium flex items-center ${isValid && !isSubmitting ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-400 cursor-not-allowed'} transition`}
                    disabled={!isValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      'Enregistrement...'
                    ) : (
                      <>
                        <FiSave className="mr-2" />
                        Publier l'article
                      </>
                    )}
                  </button>
                </div>
              )}
            />
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="font-medium text-lg text-gray-800 mb-4">Conseils pour un bon article</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">•</span>
              <span>Un titre clair et accrocheur</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">•</span>
              <span>Structurez votre contenu avec des paragraphes</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">•</span>
              <span>Ajoutez des images pertinentes</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">•</span>
              <span>Choisissez la bonne catégorie</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;