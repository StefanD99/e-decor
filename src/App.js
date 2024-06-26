import './App.css';
import CustomNavbar from './layouts/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './layouts/Footer';
import Categories from './categories/Categories';
import ProductPage from './pages/ProductPage';
import ScrollToTop from './shared/ScrollToTop';
import Bought from './products/Bought';
import Register from './pages/Register';
import { AuthProvider } from './context/authContext/AuthContext';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import { AlertProvider } from './context/alertContext/AlertContext';
import { MainProvider } from './context/MainContext';
import ProtectedRoute from './shared/ProtectedRoute';
import NotFound from './pages/NotFound';

function App() {
  
  return (
    <MainProvider>
      <AlertProvider>
          <AuthProvider>
            <Router>
              <ScrollToTop />
                <CustomNavbar />
                  <Routes>
                    <Route exact path='/home' element={<Home />} />
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/categories' element={<Categories />} />
                    <Route exact path='/product' element={<ProductPage />} />
                    <Route exact path='/bought' element={<Bought  />} />
                  <Route element={<ProtectedRoute />}>
                    <Route exact path='/auth/register' element={<Register />} />
                    <Route exact path='/auth/login' element={<Login />} />
                    <Route exact path='/auth/forgot-password' element={<ForgotPassword />} />
                  </Route>
                  <Route path='/*' element={<NotFound />} />
                  </Routes>
                <Footer />
            </Router>
          </AuthProvider>
      </AlertProvider>
    </MainProvider>
  );
}

export default App;
