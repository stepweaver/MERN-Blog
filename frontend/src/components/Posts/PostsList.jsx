import { useMutation, useQuery } from '@tanstack/react-query';
import { deletePost, fetchAllPosts } from '../../APIServices/posts/postsAPI';
import { Link } from 'react-router-dom';

const PostsList = () => {
  const { isError, isLoading, data, error, isSuccess, refetch } = useQuery({
    queryKey: ['lists-posts'],
    queryFn: fetchAllPosts
  });

  // post mutation
  const postMutation = useMutation({
    mutationKey: ['delete-post'],
    mutationFn: deletePost
  });

  // delete handler
  const handleDelete = async (postId) => {
    postMutation
      .mutateAsync(postId)
      .then(() => {
        // refetch posts
        refetch();
      })
      .catch(() => {});
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isSuccess && <p>Posts retrieved successfully</p>}
      {isError && <p>{error.message}</p>}
      {data?.posts.map((post) => (
        <div key={post?._id}>
          <div
            dangerouslySetInnerHTML={{
              __html: post?.description
            }}
          />
          <Link to={`/posts/${post?._id}`}>
            <button>Edit</button>
          </Link>
          <button onClick={() => handleDelete(post?._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
