import { Image, Offcanvas, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { RiShoppingCartFill } from 'react-icons/ri';
import './navbar.css';
import React, { useContext, useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { VscAccount } from "react-icons/vsc";
import { logoutUser } from '../context/authContext/authActions';
import AuthContext from '../context/authContext/AuthContext';
import ActionTypes from '../context/authContext/authActionTypes';
import AlertContext from '../context/alertContext/AlertContext';
import { auth, db } from '../fbConfig';
import { doc, getDoc } from 'firebase/firestore';

function CustomNavbar({size, cart, setCart, handleChange, setIsBought}) {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const {dispatch, isAuthenticated} = useContext(AuthContext);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [warning, setWarning] = useState(false);
  const {showAlert} = useContext(AlertContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');

  const handleClose = () => {
    setShowOffcanvas(false);
  }
  const handleShow = () => setShowOffcanvas(true);

  const [price, setPrice] = useState(0);

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 5000)
    } else {
      setWarning(false);
      // setCart([]);
      handleClose();
      setIsBought(true);
      // setShowCongratulations(true);
      navigate('/bought');
        setTimeout(() => {
          setShowCongratulations(false);
        }, 5000)
    }
  };

  useEffect(() => {
    return () => clearTimeout();
  }, []);

  const handlePrice = () => {
    let ans = 0;
    cart.map((item) => (
      ans += item.amount * item.price
    ))
    setPrice(ans);
  }

  const handleRemoveItem = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    cart.map((item) => {
      if (item.id === id) {
        item.amount = 1
      }
    });
    setCart(arr);
  };

  useEffect(() => {
    handlePrice();
  });

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Remove
    </Tooltip>
  );

  const onLogout = async () => {
    const logoutResponse = await logoutUser();
    if (logoutResponse) {
      dispatch({
        type: ActionTypes.LOGOUT_SUCCESS
      });
      showAlert('You have successfully logged out!');
      navigate('/auth/login');
    } else {
      dispatch({
        type: ActionTypes.LOGOUT_ERROR
      });
      showAlert('Oops! Something went wrong while trying to log you out. Please try again later.', 'danger');
    }
  };

  useEffect(() => {
    const fetchUsername = async () => {
      if (isAuthenticated) {
        const user = auth.currentUser;
        if (user) {
          const uid = user.uid;
          const userDocRef = doc(db, 'users', uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const fetchedUsername = userDoc.data().userName;
            setUsername(fetchedUsername);
          }
        }
      }
    };

    fetchUsername();
  }, [isAuthenticated]);

  
  


  return (
    
    <Navbar className="bg-body-tertiary navbar" >

      <Container className='nav-container' fluid>
        <Navbar.Brand as={Link} to={'/home'}>
            <Image className='logo' src={logo} />
        </Navbar.Brand>

        <Dropdown className='dropdown'>
          <Dropdown.Toggle id="dropdown-basic">
            <VscAccount className={`${!isAuthenticated ? 'not-logged-in_account-icon' : 'logged-in_account-icon'}`} />
            <div className='user-userName'>
                {
                  isAuthenticated && username && (
                  <>
                   Hello <span className="username-span">{username}</span>
                  </>
                    )
                }
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu 
            className='dropdown-menu'>
            {
              !isAuthenticated 
              ? 
              <>
              <Dropdown.Item className='item-list' as={Link} to={'/auth/register'}>Register</Dropdown.Item>
              <Dropdown.Item className='item-list' as={Link} to={'/auth/login'}>Login</Dropdown.Item>
              </>
              :
              <Dropdown.Item className='item-list' onClick={onLogout}>Logout</Dropdown.Item>
            }
          </Dropdown.Menu>
        </Dropdown>

          <Nav className="justify-content-end">
            <Nav.Link as={Link} to={'/categories'} className='navbar-brand link-1' style={{ fontFamily: 'Verdana' }}>
                CATEGORIES
            </Nav.Link>
            <Nav.Link as={Link} to={'/product'} className='navbar-brand link-2' style={{ fontFamily: 'Verdana' }}>
              PRODUCT PAGE
            </Nav.Link>
            <Nav.Link onClick={handleShow}>
            <div className='cart-div'>
              <RiShoppingCartFill className='cart-icon' size={30} style={{ cursor: 'pointer', color: 'black' }} /><span className='cart-span'>{size}</span>
            </div>
            </Nav.Link>
          </Nav>
          </Container>
      
          <Offcanvas show={showOffcanvas} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Shopping Cart ({size})</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <article>
            {
              cart?.map((item) =>(
                <div className="cart-box" key={item.id}>
                    <div className='cart-img'>
                      <img src={item.image} alt="img" />
                      <p>{item.name}</p>
                    </div>
                    <div className='inc-dec-buttons'>
                      <button className='inc-btn' onClick={() => handleChange(item, +1)}> + </button>
                      <button className='amount-btn'>{item.amount}</button>
                      <button className='dec-btn' onClick={() => handleChange(item, -1)}> - </button>
                    </div>
                    <div className='price-remove-btn-div'>
                      <span>{item.price + '$'}</span>
                      <OverlayTrigger
                        placement="left"
                        delay={{ show: 150, hide: 400 }}
                        overlay={renderTooltip}
                        >
                      <button onClick={() => handleRemoveItem(item.id)}>&times;</button>
                      </OverlayTrigger>
                    </div>
                </div>
              ))
            }
            <div className='total'>
              <span>Subtotal</span>
              <span>{price.toFixed(2)}$</span>
              {
                !isAuthenticated 
                ?
                <>
                <button disabled={!cart.length} onClick={handleBuyNow}>
                Checkout
              </button>
              {warning && <div className='warning-div'>You need to login in order to purchase {size === 1 ? 'product' : 'products'}</div>}
              </>
                :
              <Link to={'/bought'}>
              <button disabled={!cart.length} onClick={() => {
                                              // setCart([]); 
                                              handleClose(); 
                                              setIsBought(true);
                                              handleBuyNow();}}>
                Checkout
              </button>
              
              </Link>
              }
            </div>
          </article>
          
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
    
  );
}

export default CustomNavbar;