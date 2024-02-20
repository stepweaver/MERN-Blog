import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreatePost from './components/Posts/CreatePost';
import PostsList from './components/Posts/PostsList';
import PublicNavbar from './components/Navbar/PublicNavbar';
import HomePage from './components/Home/HomePage';

function App() {
  return (
    <BrowserRouter>
      {/* public navbar */}
      <PublicNavbar />
      <Routes>
        {/* create post */}
        <Route element={<HomePage />} path='/' />
        <Route element={<CreatePost />} path='/create-post' />
        <Route element={<PostsList />} path='/posts' />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
