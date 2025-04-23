import { FaEdit, FaTrash, FaComment } from "react-icons/fa";

export default function ArticleCard({ article }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img 
        src={article.image} 
        alt={article.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-dark">{article.title}</h3>
        <p className="text-gray-600 mt-2">{article.content.substring(0, 100)}...</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="bg-primary text-white px-2 py-1 rounded text-sm">
            {article.category}
          </span>
          <div className="flex space-x-3">
            <button className="text-blue-500 hover:text-blue-700">
              <FaEdit />
            </button>
            <button className="text-red-500 hover:text-red-700">
              <FaTrash />
            </button>
          </div>
        </div>
        <div className="mt-3 flex items-center text-gray-500">
          <FaComment className="mr-2" />
          <span>{article.comments.length} comments</span>
        </div>
      </div>
    </div>
  );
}