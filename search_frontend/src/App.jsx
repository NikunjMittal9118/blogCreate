import './App.css'
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import CreateBlogPage from './pages/CreateBlog/CreateBlogPage.jsx';
import BlogDetailsPage from './pages/BlogDetails/BlogDetailsPage.jsx';
import SignupPage from './pages/SignupPage/SignupPage.jsx'
import LoginPage from './pages/LoginPage/LoginPage.jsx'
import PrivateComponent from './components/PrivateComponents/PrivateComponent.jsx';

function App() {

  return (
    <div className='App'>
      <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateBlogPage />} />
            <Route path="/searchBlog/:id" element={<BlogDetailsPage />} />
          </Route>
          <Route path='/register' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App
