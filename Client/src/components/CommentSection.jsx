import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FaRegUserCircle, FaTrash, FaPaperPlane } from 'react-icons/fa';

const CommentSection = ({ comments, onAddComment, onDeleteComment, currentUser }) => {
  const validationSchema = Yup.object().shape({
    content: Yup.string().required('Comment cannot be empty')
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data) => {
    onAddComment(data);
    reset();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Comments ({comments.length})</h3>
      
      {currentUser && (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Add your comment
            </label>
            <div className="relative">
              <textarea
                id="content"
                name="content"
                rows="4"
                {...register('content')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Share your thoughts..."
              ></textarea>
              <button
                type="submit"
                className="absolute right-3 bottom-3 text-emerald-600 hover:text-emerald-800 transition"
              >
                <FaPaperPlane className="text-xl" />
              </button>
            </div>
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
            )}
          </div>
        </form>
      )}

      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-0">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <FaRegUserCircle className="text-2xl text-emerald-500" />
                  <div>
                    <p className="font-medium text-gray-900">{comment.author || 'Anonymous'}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                {currentUser && currentUser.id === comment.userId && (
                  <button 
                    onClick={() => onDeleteComment(comment.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                    title="Delete comment"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
              <p className="text-gray-700 pl-11">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;