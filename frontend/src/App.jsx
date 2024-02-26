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
import { useSelector } from 'react-redux';

function App() {
  // Get the user from the local storage
  const { userAuth } = useSelector((state) => state.auth);
  console.log(userAuth);
  return (
    <BrowserRouter>
      {userAuth ? <PrivateNavbar /> : <PublicNavbar />}
      {/* routes */}
      <Routes>
        {/* create post */}
        <Route element={<Home />} path='/' />
        <Route element={<CreatePost />} path='/create-post' />
        <Route element={<PostsList />} path='/posts' />
        <Route element={<PostDetails />} path='/posts/:postId' />
        <Route element={<Login />} path='/login' />
        <Route element={<Register />} path='/register' />
        <Route element={<Profile />} path='/profile' />
        {/* <Route element={<UpdatePost />} path='/posts/:postId' /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
