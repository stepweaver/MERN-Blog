import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreatePost from './components/Posts/CreatePost';
import PostsList from './components/Posts/PostsList';
import PublicNavbar from './components/Navbar/PublicNavbar';
import PrivateNavbar from './components/Navbar/PrivateNavbar';
import Home from './components/Home/Home';
import Login from './components/User/Login';
import Register from './components/User/Register';
// import UpdatePost from './components/Posts/UpdatePost';
import PostDetails from './components/Posts/PostDetails';
import Profile from './components/User/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { checkAuthStatus } from './APIServices/users/usersAPI';
import { useEffect } from 'react';
import { isAuthenticated } from './redux/slices/authSlices';
import AuthRoute from './components/AuthRoute/AuthRoute';
import UserDashboard from './components/User/Dashboard';
import AccountSummaryDashboard from './components/User/AccountSummary';

function App() {
  const { isError, isLoading, data, error, isSuccess, refetch } = useQuery({
    queryKey: ['user-auth'],
    queryFn: checkAuthStatus
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAuthenticated(data));
  }, [dispatch, data]);

  console.log(data);
  // Get the user from the local storage
  const { userAuth } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      {userAuth ? <PrivateNavbar /> : <PublicNavbar />}
      {/* routes */}
      <Routes>
        <Route element={<Home />} path='/' />
        <Route
          element={
            <AuthRoute>
              <UserDashboard />
            </AuthRoute>
          }
          path='/dashboard'
        >
          {/* Account summary */}
          <Route
            element={
              <AuthRoute>
                <AccountSummaryDashboard />
              </AuthRoute>
            }
            path=''
          />
          {/* Create post */}
          <Route
            element={
              <AuthRoute>
                <CreatePost />
              </AuthRoute>
            }
            path='create-post'
          />
        </Route>
        <Route element={<PostsList />} path='/posts' />
        <Route element={<PostDetails />} path='/posts/:postId' />
        <Route element={<Login />} path='/login' />
        <Route element={<Register />} path='/register' />
        <Route
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
          path='/profile'
        />
        {/* <Route element={<UpdatePost />} path='/posts/:postId' /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
