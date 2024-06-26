import './App.css';
import CustomNavbar from './layouts/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './layouts/Footer';
import Categories from './categories/Categories';
import { useState } from 'react';
import ProductPage from './pages/ProductPage';
import ScrollToTop from './shared/ScrollToTop';
import Bought from './products/Bought';
import Register from './pages/Register';
import { AuthProvider } from './context/authContext/AuthContext';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import { AlertProvider } from './context/alertContext/AlertContext';

function App() {
  const [cart, setCart] = useState([]);
  const [warning, setWarning] = useState(false);
  const [isBought, setIsBought] = useState(false);

  const [showCongratulations, setShowCongratulations] = useState(false);
  

  const handleClick = (item) => {
    let isPresent = false;
    cart.forEach((product) => {
      if (item.id === product.id) {
        isPresent = true;
      }
    })
    if (isPresent) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000);
        return;
    } else {
      setShowCongratulations(true);
      setTimeout(() => {
        setShowCongratulations(false);
      }, 2000)
    }
    setCart([...cart, item]);
  }

  const handleChange = (item, d) => {
    let ind = -1;
    cart.forEach((data, index) => {
      if (data.id === item.id) {
        ind = index;
      }
    });
    const tempArr = cart;
    tempArr[ind].amount += d;
    if (tempArr[ind].amount === 0) {
      tempArr[ind].amount = 1;
    }
    setCart([...tempArr]);
  }

  const [detail, setDetail] = useState([]);
    const [press, setPress] = useState(false);
    const [active, setActive] = useState(false);

    const detailPage = (product) => {
        setActive(true)
        setDetail([{...product}])
        setPress(true)
    };

  
  return (
      <AlertProvider>
          <AuthProvider>
            <Router>
              <ScrollToTop />
            <CustomNavbar size={cart.length} cart={cart} setCart={setCart} handleChange={handleChange} setIsBought={setIsBought} />
            <Routes>
              <Route exact path='/home' element={<Home detailPage={detailPage} />} />
              <Route exact path='/' element={<Home detailPage={detailPage} />} />
              <Route exact path='/categories' element={<Categories 
                                                        handleClick={handleClick} 
                                                        warning={warning} 
                                                        detailPage={detailPage} 
                                                        showCongratulations={showCongratulations} />} />
              <Route exact path='/product' element={<ProductPage 
                                                    handleClick={handleClick} 
                                                    warning={warning} 
                                                    detailPage={detailPage} 
                                                    press={press} 
                                                    detail={detail}
                                                    showCongratulations={showCongratulations} />} />
              <Route exact path='/bought' element={<Bought isBought={isBought} cart={cart} setCart={setCart} size={cart.length} />} />
              <Route exact path='/auth/register' element={<Register />} />
              <Route exact path='/auth/login' element={<Login />} />
              <Route exact path='/auth/forgot-password' element={<ForgotPassword />} />
            </Routes>
            <Footer />
            </Router>
          </AuthProvider>
      </AlertProvider>
  );
}

export default App;
