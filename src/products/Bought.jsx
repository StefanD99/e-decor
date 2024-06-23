import {Col, Container, Row } from "react-bootstrap";
import "./bought.css";
import React, { useEffect, useState } from "react";

function Bought({isBought, cart, setCart, size}) {
    const [price, setPrice] = useState(0);


    const handlePrice = () => {
        let ans = 0;
        cart.map((item) => (
          ans += item.amount * item.price
        ))
        setPrice(ans);
      };

      useEffect(() => {
        handlePrice();
      });

      const handleBuy = () => {
        setCart([]);
      };

    return (
        <>
        {
            cart.length 
            ? 
                <Container className='mt-5 custom-container cart_container'>
                    <h1 className="text-center mb-4 shoppint-items-title">Your Shopping Items</h1>
                    <Row className="justify-content-md-center row-form row-box">
                        <Col md={7} className="mb-4 col-item">
                            {
                                cart?.map((item) => {
                                    return (
                                      <React.Fragment key={item.id}>
                                      <div className='detail-info-2'>
                                        <div className="img-box-2">
                                          <img src={item.image} alt="img" className='main-image-2' />
                                        </div>
                                        <div className="product-detail-2">
                                          <h2>{item.name}</h2>
                                          Quantity: <button className='amount-btn item-amount-btn'>{item.amount}</button>
                                          <p className='item_price-2'>{item.price + '$'}</p>
                                          <p className='des-2'>{item.des}</p>
                                        </div>
                                      </div>
                                      </React.Fragment>
                                    )
                                  })
                            }
                        </Col>
                    </Row>
                    <div className='total' >
                        <span>Subtotal({size} {size === 1 ? 'item' : 'items'}) </span>
                        <span>{price.toFixed(2)}$ </span>
                        <button onClick={handleBuy}>Buy</button>
                    </div>
                </Container>
            : 
            <div className="text-div">
                <h1 className={!isBought ? 'text-danger' : 'text-success'}>{!isBought ? 'Ooops! Something went wrong. Please go back and buy some product/s first!' : `Thanks for the purchase! Your product will arrive at your address shortly!`}</h1>
            </div>
        }
        </>
    )
};

export default Bought;
