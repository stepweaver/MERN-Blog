import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchPost, updatePost } from '../../APIServices/posts/postsAPI';

const UpdatePost = () => {
  //! Get the postId from the URL
  const { postId } = useParams();

  const { data } = useQuery({
    queryKey: ['post-details', postId],
    queryFn: () => fetchPost(postId)
  });
  console.log(data);
  const postMutation = useMutation({
    mutationkey: ['update-post'],
    mutationFn: updatePost
  });

  const formik = useFormik({
    initialValues: {
      title: data?.postFound?.title || '',
      description: data?.postFound?.description || ''
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required')
    }),
    onSubmit: (values) => {
      const postData = {
        title: values.title,
        description: values.description,
        postId
      }
      postMutation.mutate(postData);
    }
  });

  // Get loading state
  const isLoading = postMutation.isPending;
  const isError = postMutation.isError;
  const isSuccess = postMutation.isSuccess;
  const error = postMutation.error;

  return (
    <div>
      <h1>You are editing -{data?.postFound.title}</h1>
      <div>
        {isLoading && <p>Loading...</p>}
        {isSuccess && <p>Post updated successfully</p>}
        {isError && <p>{error.message}</p>}
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
          <button type='submit'>Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
