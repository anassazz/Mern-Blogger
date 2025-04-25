import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

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
    <div className="mt-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Comments</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <div>
          <label htmlFor="content" className="sr-only">Your comment</label>
          <textarea
            id="content"
            name="content"
            rows="3"
            {...register('content')}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Write a comment..."
          ></textarea>
          {errors.content && (
            <p className="mt-2 text-sm text-red-600">{errors.content.message}</p>
          )}
        </div>
        <div className="mt-3">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Post Comment
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between">
              <p className="text-sm font-medium text-gray-900">{comment.author || 'Anonymous'}</p>
              {currentUser && currentUser.id === comment.userId && (
                <button 
                  onClick={() => onDeleteComment(comment.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-600">{comment.content}</p>
            <p className="mt-2 text-xs text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;