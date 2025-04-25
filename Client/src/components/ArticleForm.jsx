import { Formik } from 'formik';
import * as Yup from 'yup';
import { useCategories } from '../hooks/useCategories';

const ArticleForm = ({ initialValues, onSubmit, loading }) => {
  const { categories } = useCategories();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    categoryId: Yup.string().required('Category is required'),
    image: Yup.string().url('Must be a valid URL').nullable()
  });

  return (
    <Formik
      initialValues={initialValues || {
        title: '',
        content: '',
        categoryId: '',
        image: ''
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.title && touched.title && (
              <p className="mt-2 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              name="content"
              id="content"
              rows="6"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.content}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            ></textarea>
            {errors.content && touched.content && (
              <p className="mt-2 text-sm text-red-600">{errors.content}</p>
            )}
          </div>

          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="categoryId"
              id="categoryId"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.categoryId}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && touched.categoryId && (
              <p className="mt-2 text-sm text-red-600">{errors.categoryId}</p>
            )}
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image URL (optional)
            </label>
            <input
              type="text"
              name="image"
              id="image"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.image}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.image && touched.image && (
              <p className="mt-2 text-sm text-red-600">{errors.image}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ArticleForm;