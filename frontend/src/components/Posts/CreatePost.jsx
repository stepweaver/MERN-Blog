import { useFormik } from 'formik';
import 'react-quill/dist/quill.snow.css';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import { useMutation } from '@tanstack/react-query';
import { createPost } from '../../APIServices/posts/postsAPI';
import React from 'react';

const CreatePost = () => {
  // state for the WYSIWYG editor
  const [description, setDescription] = React.useState('');

  // Create post mutation
  const postMutation = useMutation({
    mutationkey: ['create-post'],
    mutationFn: createPost
  });

  const formik = useFormik({
    initialValues: {
      description: ''
    },
    validationSchema: Yup.object({
      description: Yup.string().required('Description is required')
    }),
    onSubmit: (values) => {
      const postData = {
        description: values.description
      };
      postMutation.mutate(postData);
    }
  });

  // Get loading state
  const isLoading = postMutation.isPending;
  const isError = postMutation.isError;
  const isSuccess = postMutation.isSuccess;

  const error = postMutation.error?.response?.data?.message;

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isSuccess && <p>Post created successfully</p>}
      {isError && <p>{error}</p>}
      <form onSubmit={formik.handleSubmit}>
        <ReactQuill
          theme='snow'
          value={formik.values.description}
          onChange={(value) => {
            formik.setFieldValue('description', value);
            setDescription(value);
          }}
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

//TODO: Use alert component to display error message?
