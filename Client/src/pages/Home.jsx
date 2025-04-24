import { useEffect, useState } from "react";
import { from } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { Link } from "react-router-dom";
import { FaSearch, FaPlus } from "react-icons/fa";
import ArticleCard from "../components/ArticleCard";
import { getArticles, deleteArticle } from "../services/articles";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
        setFilteredArticles(data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des articles");
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const subscription = from(searchTerm)
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map((term) =>
          articles.filter(
            (article) =>
              article.title.toLowerCase().includes(term.toLowerCase()) ||
              article.content.toLowerCase().includes(term.toLowerCase()) ||
              article.category.toLowerCase().includes(term.toLowerCase())
          )
        )
      )
      .subscribe((result) => {
        setFilteredArticles(result);
      });

    return () => subscription.unsubscribe();
  }, [searchTerm, articles]);

  const handleDelete = async (id) => {
    try {
      await deleteArticle(id);
      setArticles(articles.filter((article) => article.id !== id));
      setFilteredArticles(filteredArticles.filter((article) => article.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression", err);
    }
  };

  if (loading) return <div className="text-center py-12">Chargement...</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Derniers articles</h1>
          <Link
            to="/articles/create"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <FaPlus className="mr-2" />
            Nouvel article
          </Link>
        </div>

        <div className="mb-8 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Rechercher des articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun article trouvé</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
