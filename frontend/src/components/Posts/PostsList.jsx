import { useQuery } from '@tanstack/react-query';
import { fetchAllPosts } from '../../APIServices/posts/postsAPI';

const PostsList = () => {
  const { isError, isLoading, data, error, isSuccess } = useQuery({
    queryKey: ['lists-posts'],
    queryFn: fetchAllPosts
  });
  
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isSuccess && <p>Posts retrieved successfully</p>}
      {isError && <p>Error: {error.message}</p>}
      {data?.posts.map((post) => (
        <div key={post?._id}>
          <h2>{post?.title}</h2>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
