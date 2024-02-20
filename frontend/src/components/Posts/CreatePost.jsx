import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { createPostAPI } from '../../APIServices/posts/postsAPI';

const CreatePost = () => {
  // Create post mutation
  const postMutation = useMutation({
    mutationkey: ['create-post'],
    mutationFn: createPostAPI
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required')
    }),
    onSubmit: (values) => {
      postMutation.mutate(values);
    }
  });

  // Get loading state
  const isLoading = postMutation.isPending;
  const isError = postMutation.isError;
  const isSuccess = postMutation.isSuccess;
  const error = postMutation.error;

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isSuccess && <p>Post created successfully</p>}
      {isError && <p>Error: {error.message}</p>}
      <form onSubmit={formik.handleSubmit}>
        <input
          type='text'
          name='title'
          placeholder='Enter Title'
          {...formik.getFieldProps('title')}
        />
        {/* Display error message */}
        {formik.touched.title && formik.errors.title ? (
          <span style={{ color: 'red' }}>{formik.errors.title}</span>
        ) : null}
        <input
          type='text'
          name='description'
          placeholder='Enter Description'
          {...formik.getFieldProps('description')}
        />
        {formik.touched.description && formik.errors.description ? (
          <span style={{ color: 'red' }}>{formik.errors.description}</span>
        ) : null}
        <button type='submit'>Create</button>
      </form>
    </div>
  );
};

export default CreatePost;

//TODO: Use alert component to display error message
