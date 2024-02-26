import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkAuthStatus } from '../../APIServices/users/usersAPI';
import { isAuthenticated } from '../../redux/slices/authSlices';

const Profile = () => {
  const { isError, isLoading, data, error, isSuccess, refetch } = useQuery({
    queryKey: ['user-auth'],
    queryFn: checkAuthStatus
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAuthenticated(data));
  }, [data]);
  return <div>Profile</div>;
};

export default Profile;
