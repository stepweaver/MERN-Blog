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
import AddCategory from './components/Category/AddCategory';
import CreatePlan from './components/Plans/CreatePlan';
import Pricing from './components/Plans/Pricing';

function App() {
  const { isError, isLoading, data, error, isSuccess, refetch } = useQuery({
    queryKey: ['user-auth'],
    queryFn: checkAuthStatus
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAuthenticated(data));
  }, [dispatch, data]);

  // Get the user from the local storage
  const { userAuth } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      {userAuth ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route element={<Home />} path='/' />
        {/* User Dashboard */}
        <Route element={<UserDashboard />} path='/dashboard'>
          {/* Account Summary */}
          <Route
            element={
              <AuthRoute>
                <AccountSummaryDashboard />
              </AuthRoute>
            }
            path=''
          />
          {/* Create Posts */}
          <Route
            element={
              <AuthRoute>
                <CreatePost />
              </AuthRoute>
            }
            path='create-post'
          />
          {/* Create Plans */}
          <Route
            element={
              <AuthRoute>
                <CreatePlan />
              </AuthRoute>
            }
            path='create-plan'
          />
          {/* Add Category */}
          <Route
            element={
              <AuthRoute>
                <AddCategory />
              </AuthRoute>
            }
            path='add-category'
          />
        </Route>
        {/* Public Routes */}
        <Route element={<PostsList />} path='/posts' />
        <Route element={<PostDetails />} path='/posts/:postId' />
        <Route element={<Login />} path='/login' />
        <Route element={<Register />} path='/register' />
        <Route element={<Pricing />} path='/pricing' />
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
