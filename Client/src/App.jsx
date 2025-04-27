import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail';
import CreateArticle from './pages/CreateArticle';
import EditArticle from './pages/EditArticle';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
 // Make sure to import Navbar

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route index element={<Home />} />
            <Route path="articles" element={<ArticleList />} />
            <Route path="articles/:id" element={<ArticleDetail />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            
            <Route path="articles/create" element={
              <PrivateRoute>
                <CreateArticle />
              </PrivateRoute>
            } />
            <Route path="articles/:id/edit" element={
              <PrivateRoute>
                <EditArticle />
              </PrivateRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;