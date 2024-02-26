import { useQuery } from '@tanstack/react-query';
import Login from '../User/Login';
import { checkAuthStatus } from '../../APIServices/users/usersAPI';
import { Navigate } from 'react-router-dom';
import AuthLoader from './AuthCheckingSpinner';

const AuthRoute = ({ children }) => {
  const { isError, isLoading, data, error, isSuccess, refetch } = useQuery({
    queryKey: ['user-auth'],
    queryFn: checkAuthStatus
  });

  if (isLoading) return <AuthLoader />;
  if (!data) {
    return <Navigate to='/login' />;
  }
  return children;
};

export default AuthRoute;
